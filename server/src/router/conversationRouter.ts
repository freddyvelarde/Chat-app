import { Router } from "express";
import { protectRoute } from "../middleware/verifyToken";
import {
  getAllConversationsByUser,
  getAllMessagesByConversationId,
  sendMessage,
  sendMessageFirstMessage,
} from "../controllers/conversationController";

const routes: Router = Router();

routes.get("/", protectRoute, getAllConversationsByUser);
// routes.get("/:user_id", protectRoute, getAllMessagesFromConversation);
routes.get("/:conversationId", getAllMessagesByConversationId);
routes.post("/sendFirst/:username", protectRoute, sendMessageFirstMessage);
routes.post("/send", protectRoute, sendMessage);

export default routes;
