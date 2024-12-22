import { Request, Response } from "express";
import prisma from "../db/prisma";
import { comparePasswords, hashPassword } from "../utils/passwordSecurity";
import { generateToken } from "../utils/jwt";

export const createNewUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const passwordHashed = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      username,
      password: passwordHashed,
    },
  });

  res.send({ message: "Creating new user", user });
};

export const logIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const userData = await prisma.user.findFirst({
      where: { username },
    });

    if (!userData) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const passwordValidate = await comparePasswords(
      password,
      userData.password,
    );

    if (!passwordValidate) {
      res.status(401).json({ message: "Your password is incorrect" });
      return;
    }

    const token = generateToken({ userId: userData.id });

    res.status(200).json({ message: "Login successful", userData, token });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};