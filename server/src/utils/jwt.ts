import jwt from "jsonwebtoken";

import { SECRET_KEY_JWT_VAR } from "../config/environment_variables";

export const generateToken = (
  payload: object,
  expiresIn = 60 * 60 * 24 * 7,
) => {
  return jwt.sign(payload, SECRET_KEY_JWT_VAR, { expiresIn });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY_JWT_VAR);
  } catch (error) {
    throw new Error("Invalid token");
  }
};
