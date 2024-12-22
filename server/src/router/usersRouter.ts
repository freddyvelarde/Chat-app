import { Router, Request, Response } from "express";
import prisma from "../db/prisma";
import { protectRoute } from "../middleware/authMiddleware";

const router: Router = Router();

router.get("/", protectRoute, async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.send(users);
});

export default router;
