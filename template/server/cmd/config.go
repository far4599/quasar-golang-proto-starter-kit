package main

import (
  "fmt"
  "os"
)

type config struct {
  originsAllowed string
  httpHost       string
  httpPort       string
}

func getConfig() config {
  // add your own env vars to the slice to check if their value is not empty
  for _, v := range []string{"ORIGINS_ALLOWED"} {
    if os.Getenv(v) == "" {
      panic(fmt.Sprintf("failed to get config options: $%s is empty", v))
    }
  }

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

  return conf
}
