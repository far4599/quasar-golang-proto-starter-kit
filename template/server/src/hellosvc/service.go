package hellosvc

import (
  "context"
  "fmt"
  "github.com/golang/protobuf/ptypes/empty"
  "log"
  "server/proto/hellosvc"
)

type service struct {
  hellosvc.UnimplementedHelloServiceServer
}

func NewServiceServer() hellosvc.HelloServiceServer {
  return &service{}
}

func (s *service) GetGreeting(ctx context.Context, req *hellosvc.GetGreetingRequest) (*hellosvc.GetGreetingReply, error) {
  msg := fmt.Sprintf("Hello %s!", req.Name)
  fmt.Println(msg)
  return &hellosvc.GetGreetingReply{Message: msg}, nil
}

func (s *service) EventsStream(_ *empty.Empty, stream hellosvc.HelloService_EventsStreamServer) error {
  for i := 0; i < 10; i++ {
    msg := fmt.Sprintf("Hello %d!", i)
    fmt.Println(msg)
    resp := &hellosvc.EventsStreamReply{
      Message: msg,
    }
    if err := stream.Send(resp); err != nil {
      log.Println("failed to send message to stream: ", resp)
      continue
    }
  }

  return nil
}
