import { Router } from "express";
import { protectRoute } from "../middleware/verifyToken";
import {
  createConversation,
  deleteConversationBewteenUsers,
  getAllConversationsByUser,
  getAllMessagesByConversationId,
  sendMessage,
  sendMessageFirstMessage,
} from "../controllers/conversationController";
// import { io } from "../socket/socket";

const routes: Router = Router();

routes.get("/", protectRoute, getAllConversationsByUser);
// routes.get("/:user_id", protectRoute, getAllMessagesFromConversation);
routes.get("/:conversationId", getAllMessagesByConversationId);
routes.post("/sendFirst/:username", protectRoute, sendMessageFirstMessage);
// routes.post("/send", protectRoute, (req, res) => sendMessage(req, res, io));
routes.post("/send", protectRoute, sendMessage);

routes.get("/create/:username", protectRoute, createConversation);
routes.delete("/:conversationId", protectRoute, deleteConversationBewteenUsers);

export default routes;
