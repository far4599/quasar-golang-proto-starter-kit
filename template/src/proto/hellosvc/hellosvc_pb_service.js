// package: hellosvc
// file: hellosvc/hellosvc.proto

var hellosvc_hellosvc_pb = require("../hellosvc/hellosvc_pb");
var google_protobuf_empty_pb = require("google-protobuf/google/protobuf/empty_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var HelloService = (function () {
  function HelloService() {}
  HelloService.serviceName = "hellosvc.HelloService";
  return HelloService;
}());

HelloService.GetGreeting = {
  methodName: "GetGreeting",
  service: HelloService,
  requestStream: false,
  responseStream: false,
  requestType: hellosvc_hellosvc_pb.GetGreetingRequest,
  responseType: hellosvc_hellosvc_pb.GetGreetingReply
};

HelloService.EventsStream = {
  methodName: "EventsStream",
  service: HelloService,
  requestStream: false,
  responseStream: true,
  requestType: google_protobuf_empty_pb.Empty,
  responseType: hellosvc_hellosvc_pb.EventsStreamReply
};

exports.HelloService = HelloService;

function HelloServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

HelloServiceClient.prototype.getGreeting = function getGreeting(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(HelloService.GetGreeting, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

HelloServiceClient.prototype.eventsStream = function eventsStream(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(HelloService.EventsStream, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.HelloServiceClient = HelloServiceClient;

