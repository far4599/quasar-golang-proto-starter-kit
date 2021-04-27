package main

import "os"

type config struct {
  httpHost      string
  httpPort      string
  secretKey     string
  webhookSecret string
}

func GetConfig() config {
  conf := config{
    httpHost:      os.Getenv("SERVER_HTTP_HOST"),
    httpPort:      os.Getenv("SERVER_HTTP_PORT"),
  }

  if conf.httpHost == "" {
    conf.httpHost = "127.0.0.1"
  }
  if conf.httpPort == "" {
    conf.httpPort = "8843"
  }

  return conf
}
