import { Request, Response } from "express";
import prisma from "../db/prisma";
import { notifyNewMessageToUser } from "../socket/socket";

export const getAllConversations = async (req: Request, res: Response) => {
  const userId = (req as any).id;

  if (!userId) {
    res.status(400).send({ message: "User ID is required" });
    return;
  }

  try {
    const memberConversations = await prisma.conversationMembers.findMany({
      where: { userId },
    });

    const conversationIds = memberConversations.map(
      (member) => member.conversationId,
    );

    const conversations = await prisma.conversation.findMany({
      where: { id: { in: conversationIds } },
    });

    res.send(conversations); // Ensure no extra wrapping
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
/**
 * @param conversationId to find all the messages.
 * */
export const getAllMessagesByConversationId = async (
  req: Request,
  res: Response,
) => {
  try {
    const { conversationId } = req.params;

    if (!conversationId) {
      res.status(400).send({ message: `ConversationId missing.` });
      return;
    }
    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { sentAt: "asc" },
      // take: 20,
      include: {
        sender: true,
      },
    });

    res.send(messages);
  } catch (error) {
    console.error("Error in getAllMessages:", error);
    res.status(500).send({
      message: "An error occurred while fetching messages.",
    });
  }
};

export const getAllConversationsByUser = async (
  req: Request,
  res: Response,
) => {
  const userId = (req as any).id;

  if (!userId) {
    res.status(400).send({ message: "User ID is required" });
    return;
  }

  try {
    const memberConversations = await prisma.conversationMembers.findMany({
      where: { userId },
    });

    const conversationIds = memberConversations.map(
      (member) => member.conversationId,
    );

    const conversations = await prisma.conversationMembers.findMany({
      where: {
        AND: {
          conversationId: { in: conversationIds },
          NOT: {
            userId,
          },
        },
      },
      include: {
        user: true,
      },
    });

    // console.log(conversations);
    res.send(conversations);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

interface IConversation {
  id: string;
  createdAt: Date;
}
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).id;
    const { message, conversationId } = req.body;

    const newMessage = await prisma.message.create({
      data: {
        content: message,
        conversationId,
        senderId: userId,
      },
    });

    const userWhoSent = await prisma.conversationMembers.findMany({
      where: {
        userId,
        conversationId,
      },
      include: {
        user: true,
      },
    });
    const member = await prisma.conversationMembers.findMany({
      where: {
        NOT: { userId },
        conversationId,
      },
      include: {
        user: true,
      },
    });

    const receiverId: string = member[0]?.userId;
    (newMessage as any)["sender"] = userWhoSent[0].user;
    notifyNewMessageToUser(receiverId, newMessage);

    res.send(newMessage);
  } catch (error) {
    res.send({
      message: "There was an error in conversationController.ts:sendMessage()",
    });
  }
};

export const createConversation = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).id;
    const { username } = req.params;

    // verify user
    const user = await prisma.user.findFirst({ where: { username } });
    if (!user) {
      res.send({ error: `user: '${username}' does not exist` });
      return;
    }

    const conversationMembersByUser = await prisma.conversationMembers.findMany(
      { where: { userId } },
    );

    let conversation: IConversation | null = null;

    for (let i = 0; i < conversationMembersByUser.length; i++) {
      let con = await prisma.conversationMembers.findFirst({
        where: {
          userId: user.id,
          conversationId: conversationMembersByUser[i].conversationId,
        },
      });
      if (con) {
        conversation = await prisma.conversation.findFirst({
          where: { id: con.conversationId },
        });

        break;
      }
    }
    // if conversation is null then there's no a conversation.
    if (conversation == null) {
      console.log(`Creating conversation between: ${userId} and ${username}`);
      conversation = await prisma.conversation.create({ data: {} });
      console.log(`Creating members to this convesation room`);
      await prisma.conversationMembers.createMany({
        data: [
          { conversationId: conversation.id, userId },
          { conversationId: conversation.id, userId: user.id },
        ],
      });
    }

    res.send(conversation);
  } catch (error) {
    res.send({
      message: "There was an error in conversationController.ts:sendMessage()",
    });
  }
};

export const sendMessageFirstMessage = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).id;
    const { username } = req.params;
    const { message } = req.body;

    // verify user
    const user = await prisma.user.findFirst({ where: { username } });
    if (!user) {
      res.send({ error: `user: '${username}' does not exist` });
      return;
    }
    const conversationMembersByUser = await prisma.conversationMembers.findMany(
      { where: { userId } },
    );

    let conversation: IConversation | null = null;

    for (let i = 0; i < conversationMembersByUser.length; i++) {
      let con = await prisma.conversationMembers.findFirst({
        where: {
          userId: user.id,
          conversationId: conversationMembersByUser[i].conversationId,
        },
      });
      if (con) {
        conversation = await prisma.conversation.findFirst({
          where: { id: con.conversationId },
        });

        break;
      }
    }
    // if conversation is null then there's no a conversation.
    if (conversation == null) {
      console.log(`Creating conversation between: ${userId} and ${username}`);
      conversation = await prisma.conversation.create({ data: {} });
      console.log(`Creating members to this convesation room`);
      await prisma.conversationMembers.createMany({
        data: [
          { conversationId: conversation.id, userId },
          { conversationId: conversation.id, userId: user.id },
        ],
      });
    }

    const newMessage = await prisma.message.create({
      data: {
        conversationId: conversation.id,
        senderId: userId,
        content: message,
      },
    });

    res.send(newMessage);
  } catch (error) {
    res.send({
      message: "There was an error in conversationController.ts:sendMessage()",
    });
  }
};
