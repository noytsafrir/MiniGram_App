import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import prisma from '../prisma/client';
import { registerSchema } from '../validators/registerValidator';
import type { ValidationErrorItem } from 'joi';

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
    const user = await prisma.user.findUnique({ where: { id: decoded.id }, });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error , value} = registerSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail: ValidationErrorItem) => detail.message);
    return res.status(400).json({ errors });
  }
  req.body = value;
  next();
};