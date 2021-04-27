package main

import (
  "flag"
  "fmt"
  "github.com/gorilla/mux"
  "github.com/improbable-eng/grpc-web/go/grpcweb"
  "golang.org/x/sync/errgroup"
  "google.golang.org/grpc"
  "net/http"
  proto "server/proto/hellosvc"
  "server/src/hellosvc"
)

func run() error {
  conf := GetConfig()

  grpcServer := grpc.NewServer()
  proto.RegisterHelloServiceServer(grpcServer, hellosvc.NewServiceServer())
  wrappedGrpc := grpcweb.WrapServer(grpcServer, grpcweb.WithOriginFunc(func(origin string) bool {
    return true
  }))

  router := mux.NewRouter()
  router.Methods("OPTIONS").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
    w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, Authorization, X-CSRF-Token, array, arrayindexoffset_, convertedprimitivefields_, messageid_, pivot_, wrappers_, x-grpc-web")
    w.Header().Set("Access-Control-Expose-Headers", "Authorization")

    w.WriteHeader(http.StatusOK)
  })

  handlerFunc := func(w http.ResponseWriter, r *http.Request) {
    if wrappedGrpc.IsGrpcWebRequest(r) {
      wrappedGrpc.ServeHTTP(w, r)
      return
    }

    // Fall back to other servers.
    router.ServeHTTP(w, r)
  }

  httpSrv := &http.Server{
    Addr:    fmt.Sprintf("%s:%s", conf.httpHost, conf.httpPort),
    Handler: http.HandlerFunc(handlerFunc),
  }

  var group errgroup.Group

  group.Go(func() error {
    // http server
    fmt.Println("http server listen on ", httpSrv.Addr)
    return httpSrv.ListenAndServe()
  })

  //lis, err := net.Listen("tcp", ":8843")
  //if err != nil {
  // return err
  //}
  //
  //group.Go(func() error {
  // // GRPC server
  // return grpcServer.Serve(lis)
  //})

  return group.Wait()
}

func main() {
  flag.Parse()

  if err := run(); err != nil {
    fmt.Println(err)
  }
}
