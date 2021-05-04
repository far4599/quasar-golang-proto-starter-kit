package main

import "os"

type config struct {
  originsAllowed string
  httpHost      string
  httpPort      string
}

func getConfig() config {
  conf := config{
    originsAllowed: os.Getenv("ORIGINS_ALLOWED"),
    httpHost:      os.Getenv("SERVER_HTTP_HOST"),
    httpPort:      os.Getenv("SERVER_HTTP_PORT"),
  }

  if conf.httpHost == "" {
    conf.httpHost = "127.0.0.1"
  }
  if conf.httpPort == "" {
    conf.httpPort = "8843"
  }

  if conf.originsAllowed == "" {
    panic("$ORIGINS_ALLOWED is empty")
  }

  return conf
}
