import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // your React app URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const chatMessages = [];
io.on("connection", (socket) => {
  // in server always put socket.emit socket.on in callback
  console.log(socket.id);
  socket.emit("message", "hello from server");
  socket.on("join", (data) => console.log(data));
  socket.on("message", (data) => console.log(data));
  socket.on("chat", (data) => chatMessages.push(data));

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});
setInterval(() => {
  io.emit("chatMessages", chatMessages);
}, 1000);
// setInterval(() => {
//   console.log("Dropping all sockets...");
//   console.log("Active sockets:", io.sockets.sockets.size);
//   io.sockets.sockets.forEach((socket) => {
//     socket.disconnect(true);
//   });
// }, 1000);

httpServer.listen(4000, () => {
  console.log("server running on http://localhost:4000");
});
