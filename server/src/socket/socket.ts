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

/**
 * This variable stores the online users, as this project is small
 * we just store them in memory.
 * @param
 * @type [userId: string]: [socketId: string]
 */
let onlineUsers: { [key: string]: string } = {};

export const getChatSocketId = (userId: string) => {
  return onlineUsers[userId];
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId as string;
  console.log(`User ${userId} connected with socketId: ${socket.id}`);

  if (userId) onlineUsers[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(onlineUsers));

  socket.on("disconnect", () => {
    delete onlineUsers[userId];
    io.emit("getOnlineUsers", Object.keys(onlineUsers));
  });
});

export const notifyNewMessageToUser = (userId: string, newMessage: any) => {
  const receiverSocketId = getChatSocketId(userId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
  } else {
    console.log(`User with ${userId} is not online.`);
  }
};
