import { Request, Response } from "express";
import prisma from "../db/prisma";

export const searchUser = async (req: Request, res: Response) => {
  const id = (req as any).id;
  const { searchQuery } = req.params;

  console.log(`userid: ${id}, searchQuery: ${searchQuery}`);

  try {
    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: searchQuery,
          mode: "insensitive",
        },
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
    console.error(
      "There was an error in userControllers.ts:getAllUsers()",
      error,
    );
    res.status(500).send({ error: "An error occurred while fetching users." });
  }
};

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
