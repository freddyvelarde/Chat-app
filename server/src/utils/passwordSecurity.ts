import bcrypt from "bcrypt";

/**
 * Hash a password using bcrypt.
 * @param password - Plain text password to hash.
 * @returns Hashed password as a promise :D.
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

/**
 * Compare a plain text password with a hashed password.
 * @param password - Plain text password.
 * @param hashedPassword - Hashed password to compare against.
 * @returns Boolean indicating if the passwords match.
 */
export const comparePasswords = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
