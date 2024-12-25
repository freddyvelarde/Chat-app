import express from "express";
import logger from "morgan";
import cors from "cors";
import userRouter from "./router/usersRouter";
import authRouter from "./router/authRouter";
import conversationRouter from "./router/conversationRouter";
import { PORT } from "./config/environment_variables";
import { app, httpServer } from "./socket/socket";

// const app: Application = express();
// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:5173", // React app's origin
//     methods: ["GET", "POST"], // Allowed HTTP methods
//     credentials: true, // Allow cookies if needed
//   },
// });

app.use(express.json());
app.use(logger("dev"));
app.use(cors());

// io.on("connection", (socket) => {
//   console.log(`User connected: ${socket.id}`);
//
//   socket.on("newMessage", (data) => {
//     console.log("New message", data);
//     io.emit("messageReceived", data);
//   });
// });

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/conversation", conversationRouter);
app.get("/", (_req, res) => {
  res.send({ message: "Hello world" });
});

// httpServer.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

export { app, httpServer, PORT };
