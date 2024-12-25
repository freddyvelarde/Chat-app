import { Router } from "express";
import { getAllUsers, searchUser } from "../controllers/userControllers";
import { protectRoute } from "../middleware/verifyToken";

const router: Router = Router();

router.get("/", protectRoute, getAllUsers);
router.get("/search/:searchQuery", protectRoute, searchUser);

export default router;
