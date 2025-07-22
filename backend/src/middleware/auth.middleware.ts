import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import prisma from '../prisma/client';

// interface AuthRequest extends Request {
//   user?: { id: number };
// }

export const authenticate = async (
  req: Request,
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
    const user= await prisma.user.findUnique({ where: { id: decoded.id },});
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    req.user = user;
    next(); 
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
