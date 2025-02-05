import { Server as SocketServer } from "socket.io";
import { Server } from "http";

let io: SocketServer;

const initSocket = (server: Server) => {
  io = new SocketServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // Socket.io connection event
  io.on("connection", (socket: any) => {
    console.log("New client connected: ", socket.id);

    socket.on("join", (userId: string) => {
      socket.join(userId);
      console.log(`User ${userId} joined the chat`);
    });

    socket.on("sendMessage", (message: any) => {
      io.to(message.receiver).emit("receiveMessage", message);
    });

    // Handle disconnect event
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

export const socketIO = {
  initSocket,
  getIO,
};
