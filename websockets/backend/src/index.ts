import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8081 });

wss.on("connection", function(socket) {
  console.log("User connected");
  socket.on("message", function(e){
    if(e.toString() === "ping"){
        socket.send("pong");
    }
  })
});
