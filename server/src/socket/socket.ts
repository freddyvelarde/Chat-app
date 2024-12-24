import express, { Application } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
// import { _URL } from "../config/environment_variables";

export const app: Application = express();

export const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on("connect", () => {
    console.log("Connected to WebSocket server:", socket.id);
  });

  socket.on("newMessage", (data) => {
    console.log("New message", data);

    io.emit("messageReceived", data);
  });

  socket.on("disconected", () => {
    console.log(`User disconected: ${socket.id}`);
  });
});
