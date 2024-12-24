import { Router } from "express";
// import { protectRoute } from "../middleware/verifyToken";
import { getAllUsers } from "../controllers/userControllers";

const router: Router = Router();

router.get("/", getAllUsers);

export default router;
