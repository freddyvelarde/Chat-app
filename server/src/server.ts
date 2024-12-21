import express, { Application } from "express";
import logger from "morgan";
import cors from "cors";
import userRouter from "./router/usersRouter";
import authRouter from "./router/authRouter";
import { PORT } from "./config/environment_variables";

// configuration
const app: Application = express();

// global middlewares
app.use(express.json());
app.use(logger("dev"));
app.use(cors());

// routers
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

export { PORT };
export default app;
