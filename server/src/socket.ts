import express, { Application } from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app: Application = express();
export const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

export interface IMessage {
  user: string;
  message: string;
  timestamp: Date;
}

// export default httpServer;
