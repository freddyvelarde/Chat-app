import { Router } from "express";
// import { protectRoute } from "../middleware/verifyToken";
import { getAllUsers } from "../controllers/userControllers";
import { protectRoute } from "../middleware/verifyToken";

const router: Router = Router();

router.get("/", protectRoute, getAllUsers);

export default router;
