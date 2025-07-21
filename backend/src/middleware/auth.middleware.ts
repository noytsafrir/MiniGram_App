import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

interface AuthRequest extends Request {
  user?: { id: number };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token) as { id: number };
    req.user = { id: decoded.id }; // attach user to request
    next(); // continue to the next middleware or route
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
