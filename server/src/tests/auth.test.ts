import { Request, Response } from "express";
import { createNewUser, logIn } from "../controllers/authControllers";
import prisma from "../db/prisma";
import { comparePasswords, hashPassword } from "../utils/passwordSecurity";
import { generateToken } from "../utils/jwt";

jest.mock("../db/prisma", () => ({
  user: {
    create: jest.fn(),
    findFirst: jest.fn(),
  },
}));

jest.mock("../utils/passwordSecurity", () => ({
  hashPassword: jest.fn(),
  comparePasswords: jest.fn(),
}));

jest.mock("../utils/jwt", () => ({
  generateToken: jest.fn(),
}));

describe("Auth Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {
      body: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createNewUser", () => {
    const mockUser = {
      id: 1,
      username: "testuser",
      password: "hashedpassword",
    };

    it("should successfully create a new user", async () => {
      mockRequest.body = {
        username: "testuser",
        password: "password123",
      };
      (hashPassword as jest.Mock).mockResolvedValue("hashedpassword");
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      await createNewUser(mockRequest as Request, mockResponse as Response);

      expect(hashPassword).toHaveBeenCalledWith("password123");
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          username: "testuser",
          password: "hashedpassword",
        },
      });
      expect(mockResponse.send).toHaveBeenCalledWith({
        message: "Creating new user",
        user: mockUser,
      });
    });

    it("should handle database errors during user creation", async () => {
      mockRequest.body = {
        username: "testuser",
        password: "password123",
      };
      (hashPassword as jest.Mock).mockResolvedValue("hashedpassword");
      (prisma.user.create as jest.Mock).mockRejectedValue(
        new Error("Database error"),
      );

      await expect(
        createNewUser(mockRequest as Request, mockResponse as Response),
      ).rejects.toThrow("Database error");
    });
  });

  describe("logIn", () => {
    const mockUser = {
      id: 1,
      username: "testuser",
      password: "hashedpassword",
    };

    it("should successfully log in a user with correct credentials", async () => {
      mockRequest.body = {
        username: "testuser",
        password: "password123",
      };
      (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
      (comparePasswords as jest.Mock).mockResolvedValue(true);
      (generateToken as jest.Mock).mockReturnValue("mock-token");

      await logIn(mockRequest as Request, mockResponse as Response);

      expect(prisma.user.findFirst).toHaveBeenCalledWith({
        where: { username: "testuser" },
      });
      expect(comparePasswords).toHaveBeenCalledWith(
        "password123",
        "hashedpassword",
      );
      expect(generateToken).toHaveBeenCalledWith({ userId: 1 });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Login successful",
        userData: mockUser,
        token: "mock-token",
      });
    });

    it("should return 404 when user is not found", async () => {
      mockRequest.body = {
        username: "nonexistentuser",
        password: "password123",
      };
      (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

      await logIn(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "User not found",
      });
    });

    it("should return 401 when password is incorrect", async () => {
      mockRequest.body = {
        username: "testuser",
        password: "wrongpassword",
      };
      (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
      (comparePasswords as jest.Mock).mockResolvedValue(false);

      await logIn(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Your password is incorrect",
      });
    });

    it("should handle unexpected errors", async () => {
      mockRequest.body = {
        username: "testuser",
        password: "password123",
      };
      (prisma.user.findFirst as jest.Mock).mockRejectedValue(
        new Error("Database error"),
      );

      await logIn(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "An error occurred",
      });
    });
  });
});
