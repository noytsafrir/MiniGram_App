import { Request, Response, NextFunction } from "express";
import { updateUserSchema } from "../validators/userValidator";

export const validateUpdateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
