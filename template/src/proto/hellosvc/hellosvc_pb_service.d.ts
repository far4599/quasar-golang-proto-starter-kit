// package: hellosvc
// file: hellosvc/hellosvc.proto

import * as hellosvc_hellosvc_pb from "../hellosvc/hellosvc_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import {grpc} from "@improbable-eng/grpc-web";

type HelloServiceGetGreeting = {
  readonly methodName: string;
  readonly service: typeof HelloService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof hellosvc_hellosvc_pb.GetGreetingRequest;
  readonly responseType: typeof hellosvc_hellosvc_pb.GetGreetingReply;
};

type HelloServiceEventsStream = {
  readonly methodName: string;
  readonly service: typeof HelloService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof hellosvc_hellosvc_pb.EventsStreamReply;
};

export class HelloService {
  static readonly serviceName: string;
  static readonly GetGreeting: HelloServiceGetGreeting;
  static readonly EventsStream: HelloServiceEventsStream;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class HelloServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getGreeting(
    requestMessage: hellosvc_hellosvc_pb.GetGreetingRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: hellosvc_hellosvc_pb.GetGreetingReply|null) => void
  ): UnaryResponse;
  getGreeting(
    requestMessage: hellosvc_hellosvc_pb.GetGreetingRequest,
    callback: (error: ServiceError|null, responseMessage: hellosvc_hellosvc_pb.GetGreetingReply|null) => void
  ): UnaryResponse;
  eventsStream(requestMessage: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata): ResponseStream<hellosvc_hellosvc_pb.EventsStreamReply>;
}

