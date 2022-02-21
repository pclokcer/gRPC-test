import * as grpc from '@grpc/grpc-js'

import * as messages from './generated/test_pb'
import * as services from './generated/test_grpc_pb'

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {

  var reply = new messages.HelloReply();

  reply.setMessage('Hello ' + call.request.getName());
  callback(null, reply);
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {

  var server = new grpc.Server()

  server.addService(services.GreeterService, { sayHello: sayHello })
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Service Started From 50051')
    server.start()
  })
}

main()