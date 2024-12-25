import express, { Application } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { BASE_URL } from "../config/environment_variables";
// import { IMessage } from "../interfaces/model.db.ts";

export const app: Application = express();

export const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: BASE_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

let onlineUsers: { [key: string]: string } = {}; // {userId: socketId}

export const getChatSocketId = (userId: string) => {
  return onlineUsers[userId];
};

io.on("connection", (socket) => {
  // clients subscribes to socket

  const userId = socket.handshake.query.userId as string;
  console.log(`User ${userId} connected with socketId: ${socket.id}`);
  console.log(onlineUsers);

  if (userId) onlineUsers[userId] = socket.id;

  // socket.on("newMessage", (data) => {
  //   console.log("New message received:", data);
  //
  //   // io.emit("messageReceived", data);
  // });

  // socket.on("newMessage", (newMessage) => {
  //   console.log("Notification (new message): ", newMessage);
  // });

  io.emit("getOnlineUsers", Object.keys(onlineUsers));

  socket.on("disconnect", () => {
    // console.log("user disconnected", socket.id);
    delete onlineUsers[userId];
    io.emit("getOnlineUsers", Object.keys(onlineUsers));
  });
});

// export const notifyNewMessageToUser = (
//   userId: string,
//   newMessage: IMessage,
// ) => {
//   const receiverSocketId = getChatSocketId(userId);
//   if (receiverSocketId) {
//     io.to(receiverSocketId).emit("newMessage", newMessage);
//   } else {
//     console.log(`User with ${userId} is not online.`);
//   }
// };
