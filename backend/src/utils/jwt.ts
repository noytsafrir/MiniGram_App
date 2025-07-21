import jwt, { SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

// Generate a new JWT token
export const generateToken = (
  payload: object,
  expiresIn: string = '1d'
): string => {
  const options: SignOptions = { expiresIn: expiresIn as SignOptions['expiresIn'] };
  return jwt.sign(payload, JWT_SECRET, options);
};

// Verify and decode an existing token
export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
