<template>
  <div class='row'>
    <div class='col-6'>
      <q-btn class='fullwidth' @click='getGreeting'>Test unary</q-btn>
    </div>
    <div class='col-6'>
      <q-btn class='fullwidth' @click='getStreamEvents'>Test stream</q-btn>
    </div>
  </div>
</template>

<script>
import {HelloServiceClient} from "../proto/hellosvc/hellosvc_pb_service";
import {GetGreetingRequest} from "../proto/hellosvc/hellosvc_pb";
import {StatusCode as grpcStatus} from 'grpc-web';
import google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export default {
  name: 'TestProto',
  data() {
    return {
      protoClient: null
    }
  },
  methods: {
    getGreeting() {
      const req = new GetGreetingRequest();
      req.setName("world")
      this.protoClient.getGreeting(req, (err, msg) => {
        if (err !== null) {
          this.$q.notify({
            type: 'negative',
            message: 'Failed to getGreeting',
            caption: err
          })
          return
        } else if (msg.getError() !== "") {
          this.$q.notify({
            type: 'negative',
            message: 'Failed to getGreeting',
            caption: msg.getError()
          })
          return
        }
        this.$q.notify({
          message: msg.getMessage(),
        })
      })
    },
    getStreamEvents() {
      const req = new google_protobuf_empty_pb.Empty();
      this.protoClient.eventsStream(req)
        .on('data', msg => {
          this.$q.notify({
            message: msg.getMessage(),
          })
        })
        .on('end', (code, details, metadata) => {
          if (code.code !== grpcStatus.OK) {
            this.$q.notify({
              type: 'negative',
              message: 'Failed to getStreamEvents',
              caption: new Error(`${details} (status code: ${code})`)
            })
          }
          // exit gracefully
        });
    }
  },
  mounted() {
    this.protoClient = new HelloServiceClient(process.env.PROD ? location.origin : 'http://localhost:8843');
  }
}
</script>
