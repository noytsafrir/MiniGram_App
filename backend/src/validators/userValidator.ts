import Joi from 'joi';
import { createSanitizedTextSchema } from './validationSchema';

export const updateUserSchema = Joi.object({
  bio: createSanitizedTextSchema(50, false), // optional bio
  username: createSanitizedTextSchema(30, true), //required username
});
