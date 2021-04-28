package main

import (
  "context"
  "flag"
  "fmt"
  "github.com/gorilla/handlers"
  "github.com/gorilla/mux"
  "github.com/improbable-eng/grpc-web/go/grpcweb"
  oklog "github.com/oklog/run"
  "google.golang.org/grpc"
  "log"
  "net/http"
  "os"
  "os/signal"
  proto "server/proto/hellosvc"
  "server/src/hellosvc"
  "strings"
  "syscall"
  "time"
)

func run() error {
  conf := getConfig()

  grpcServer := grpc.NewServer()
  proto.RegisterHelloServiceServer(grpcServer, hellosvc.NewServiceServer())
  wrappedGrpc := grpcweb.WrapServer(grpcServer, grpcweb.WithOriginFunc(func(origin string) bool {
    return origin == conf.originsAllowed
  }))

  router := mux.NewRouter().PathPrefix("/api").Subrouter()

  // here you can add more routes and handlers
  {
    //router.Methods("GET").Path("/healthcheck").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    //  w.WriteHeader(http.StatusOK)
    //  w.Write([]byte("ok"))
    //})
  }

  corsOrigins := handlers.AllowedOrigins([]string{conf.originsAllowed})
  corsHeaders := handlers.AllowedHeaders([]string{"Accept", "Content-Type", "Content-Length", "Accept-Encoding", "Authorization", "X-CSRF-Token", "array", "arrayindexoffset_", "convertedprimitivefields_", "messageid_", "pivot_", "wrappers_", "x-grpc-web"})
  corsMethods := handlers.AllowedMethods([]string{"POST", "GET", "OPTIONS", "PUT", "DELETE"})
  corsHeadersExpose := handlers.ExposedHeaders([]string{"Authorization"})
  corsMaxAge := handlers.MaxAge(24 * 60 * 60)

  handlerFunc := func(w http.ResponseWriter, r *http.Request) {
    if !strings.HasPrefix(r.URL.Path, "/api") {
      // we handle requests only if there is "/api" prefix, otherwise return 404
      http.NotFound(w, r)
      return
    }

    if wrappedGrpc.IsGrpcWebRequest(r) {
      // if request has grpc fingerprint, then try to handle it as web grpc request
      // we need to trim "/api" prefix from url to handle grpc correctly
      r.URL.Path = strings.TrimPrefix(r.URL.Path, "/api")
      wrappedGrpc.ServeHTTP(w, r)
      return
    }

    // fall back to other servers
    handlers.CORS(corsOrigins, corsHeaders, corsMethods, corsHeadersExpose, corsMaxAge)(router).ServeHTTP(w, r)
  }

  httpSrv := &http.Server{
    Addr:    fmt.Sprintf("%s:%s", conf.httpHost, conf.httpPort),
    Handler: http.HandlerFunc(handlerFunc),
  }

  // if any element of group will exit with error,
  // then the other elements will be interrupted
  var g oklog.Group
  {
    g.Add(func() error {
      // http server
      fmt.Println("http server listen on ", httpSrv.Addr)
      return httpSrv.ListenAndServe()
    }, func(err error) {
      fmt.Println("http server stopping gracefully due to error: ", err)
      ctxShutDown, cancel := context.WithTimeout(context.Background(), 3*time.Second)
      defer func() {
        cancel()
      }()

      if err = httpSrv.Shutdown(ctxShutDown); err != nil && err != http.ErrServerClosed {
        log.Println("failed to shutdown server gracefully: ", err)
      }
    })
  }
  //{
  //  lis, err := net.Listen("tcp", ":8844")
  //  if err != nil {
  //    return err
  //  }
  //  g.Add(func() error {
  //    // GRPC server
  //    return grpcServer.Serve(lis)
  //  }, func(err error) {
  //    lis.Close()
  //  })
  //}
  {
    c := make(chan os.Signal)
    g.Add(func() error {
      signal.Notify(c, syscall.SIGINT, syscall.SIGTERM)
      err := fmt.Errorf("%s", <-c)
      fmt.Println("received signal: ", err)
      return err
    }, func(err error) {
      close(c)
    })
  }

  return g.Run()
}

func main() {
  flag.Parse()

  if err := run(); err != nil {
    fmt.Println(err)
  }
}
