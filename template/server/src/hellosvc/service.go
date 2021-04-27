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
   return &hellosvc.GetGreetingReply{Message: fmt.Sprintf("Hello %s!", req.Name)}, nil
}

func (s *service) EventsStream(_ *empty.Empty, stream hellosvc.HelloService_EventsStreamServer) error {
  for i := 0; i < 10; i++ {
    resp := &hellosvc.EventsStreamReply{
      Message: fmt.Sprintf("Hello %d!", i),
    }
    if err := stream.Send(resp); err != nil {
      log.Println("failed to send message to stream: ", resp)
      continue
    }
  }

  return nil
}
