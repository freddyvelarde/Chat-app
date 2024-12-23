import { Request, Response } from "express";
import prisma from "../db/prisma";

export const getAllUsers = async (_req: Request, res: Response) => {
  const id = (_req as any).id;
  console.log(`userid: ${id}`);
  try {
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          id,
        },
      },
      select: {
        id: true,
        username: true,
        createdAt: true,
      },
    });
    res.send(users);
  } catch (error) {
    res.send(error);
    console.log("There was an error in userControllers.ts:getAllUsers()");
  }
};
