import { Request, Response } from "express";
import {
  getAllMessagesByConversationId,
  getAllConversationsByUser,
  // getAllConversations,
  sendMessage,
  sendMessageFirstMessage,
} from "../controllers/conversationController";
import prisma from "../db/prisma";

// Extend Request to include 'id'
interface AuthenticatedRequest extends Request {
  id?: string;
}

// Mock prisma
jest.mock("../db/prisma", () => ({
  message: {
    findMany: jest.fn(),
    create: jest.fn(),
  },
  conversation: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
  },
  conversationMembers: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    createMany: jest.fn(),
  },
  user: {
    findFirst: jest.fn(),
  },
}));

describe("Conversation Controller", () => {
  let mockRequest: Partial<AuthenticatedRequest>;
  let mockResponse: Partial<Response>;
  let statusMock: jest.Mock;
  let sendMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    sendMock = jest.fn();
    mockResponse = {
      status: statusMock,
      send: sendMock,
    } as unknown as Response;
    jest.clearAllMocks();
  });

  describe("getAllMessagesByConversationId", () => {
    it("should return messages for valid conversation ID", async () => {
      const mockMessages = [
        { id: "1", content: "Hello", senderId: "user1" },
        { id: "2", content: "Hi", senderId: "user2" },
      ];

      mockRequest = { params: { conversationId: "conv123" } };

      (prisma.message.findMany as jest.Mock).mockResolvedValue(mockMessages);

      await getAllMessagesByConversationId(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(prisma.message.findMany).toHaveBeenCalledWith({
        where: { conversationId: "conv123" },
        orderBy: { sentAt: "asc" },
      });
      expect(statusMock).not.toHaveBeenCalled();
      expect(sendMock).toHaveBeenCalledWith(mockMessages);
    });

    it("should return 400 if conversationId is missing", async () => {
      mockRequest = { params: {} };

      await getAllMessagesByConversationId(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(sendMock).toHaveBeenCalledWith({
        message: "ConversationId missing.",
      });
    });
  });

  describe("getAllConversationsByUser", () => {
    it("should return all conversations for a user", async () => {
      const mockUserId = "user123";
      const mockConversationMembers = [
        { conversationId: "conv1", userId: mockUserId },
        { conversationId: "conv2", userId: mockUserId },
      ];
      const mockConversations = [
        { id: "conv1", name: "Conversation 1" },
        { id: "conv2", name: "Conversation 2" },
      ];

      mockRequest = { id: mockUserId };

      (prisma.conversationMembers.findMany as jest.Mock).mockResolvedValue(
        mockConversationMembers,
      );
      (prisma.conversation.findMany as jest.Mock).mockResolvedValue(
        mockConversations,
      );

      await getAllConversationsByUser(
        mockRequest as AuthenticatedRequest,
        mockResponse as Response,
      );

      expect(prisma.conversationMembers.findMany).toHaveBeenCalledWith({
        where: { userId: mockUserId },
      });
      expect(sendMock).toHaveBeenCalledWith(mockConversations);
    });
  });

  describe("sendMessage", () => {
    it("should create and return a new message", async () => {
      const mockMessage = {
        id: "msg123",
        content: "Hello",
        conversationId: "conv123",
        senderId: "user123",
      };

      mockRequest = {
        id: "user123",
        body: {
          message: "Hello",
          conversationId: "conv123",
        },
      };

      (prisma.message.create as jest.Mock).mockResolvedValue(mockMessage);

      await sendMessage(
        mockRequest as AuthenticatedRequest,
        mockResponse as Response,
      );

      expect(prisma.message.create).toHaveBeenCalledWith({
        data: {
          content: "Hello",
          conversationId: "conv123",
          senderId: "user123",
        },
      });
      expect(sendMock).toHaveBeenCalledWith({ newMessage: mockMessage });
    });
  });

  describe("sendMessageFirstMessage", () => {
    it("should create a new conversation and message if no existing conversation", async () => {
      const mockUserId = "user123";
      const mockTargetUser = {
        id: "user456",
        username: "targetUser",
      };
      const mockConversation = {
        id: "conv123",
        createdAt: new Date(),
      };
      const mockMessage = {
        id: "msg123",
        content: "Hello",
        conversationId: "conv123",
      };

      mockRequest = {
        id: mockUserId,
        params: { username: "targetUser" },
        body: { message: "Hello" },
      };

      (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockTargetUser);
      (prisma.conversationMembers.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.conversation.create as jest.Mock).mockResolvedValue(
        mockConversation,
      );
      (prisma.message.create as jest.Mock).mockResolvedValue(mockMessage);

      await sendMessageFirstMessage(
        mockRequest as AuthenticatedRequest,
        mockResponse as Response,
      );

      expect(prisma.user.findFirst).toHaveBeenCalledWith({
        where: { username: "targetUser" },
      });
      expect(prisma.conversation.create).toHaveBeenCalled();
      expect(prisma.conversationMembers.createMany).toHaveBeenCalledWith({
        data: [
          { conversationId: mockConversation.id, userId: mockUserId },
          { conversationId: mockConversation.id, userId: mockTargetUser.id },
        ],
      });
      expect(prisma.message.create).toHaveBeenCalledWith({
        data: {
          content: "Hello",
          conversationId: mockConversation.id,
          senderId: mockUserId,
        },
      });
      expect(sendMock).toHaveBeenCalledWith({ newMessage: mockMessage });
    });

    it("should return error if target user does not exist", async () => {
      mockRequest = {
        id: "user123",
        params: { username: "nonexistentUser" },
        body: { message: "Hello" },
      };

      (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

      await sendMessageFirstMessage(
        mockRequest as AuthenticatedRequest,
        mockResponse as Response,
      );

      expect(sendMock).toHaveBeenCalledWith({
        error: "user: 'nonexistentUser' does not exist",
      });
    });
  });
});
