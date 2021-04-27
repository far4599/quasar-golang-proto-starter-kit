// package: hellosvc
// file: hellosvc/hellosvc.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class GetGreetingRequest extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetGreetingRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetGreetingRequest): GetGreetingRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetGreetingRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetGreetingRequest;
  static deserializeBinaryFromReader(message: GetGreetingRequest, reader: jspb.BinaryReader): GetGreetingRequest;
}

export namespace GetGreetingRequest {
  export type AsObject = {
    name: string,
  }
}

export class GetGreetingReply extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetGreetingReply.AsObject;
  static toObject(includeInstance: boolean, msg: GetGreetingReply): GetGreetingReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetGreetingReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetGreetingReply;
  static deserializeBinaryFromReader(message: GetGreetingReply, reader: jspb.BinaryReader): GetGreetingReply;
}

export namespace GetGreetingReply {
  export type AsObject = {
    message: string,
    error: string,
  }
}

export class EventsStreamReply extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventsStreamReply.AsObject;
  static toObject(includeInstance: boolean, msg: EventsStreamReply): EventsStreamReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EventsStreamReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventsStreamReply;
  static deserializeBinaryFromReader(message: EventsStreamReply, reader: jspb.BinaryReader): EventsStreamReply;
}

export namespace EventsStreamReply {
  export type AsObject = {
    message: string,
    error: string,
  }
}

