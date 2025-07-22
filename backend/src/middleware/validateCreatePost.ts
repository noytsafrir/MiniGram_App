import { Request, Response, NextFunction } from "express";
import { createPostSchema } from "../validators/postValidator";

export const validateCreatePost = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = createPostSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};
