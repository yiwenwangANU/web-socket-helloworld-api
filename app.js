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
  console.log(socket.id);
  socket.emit("message", "hello from server");
});

httpServer.listen(4000, () => {
  console.log("server running on http://localhost:4000");
});
