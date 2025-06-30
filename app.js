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

io.on("connection", (socket) => {
  // in server always put socket.emit socket.on in callback
  console.log(socket.id);
  socket.emit("message", "hello from server");
  socket.on("join", (data) => console.log(data));
  socket.on("message", (data) => console.log(data));
  socket.on("chat message", (data) => console.log("Chat message:", data));
});

httpServer.listen(4000, () => {
  console.log("server running on http://localhost:4000");
});
