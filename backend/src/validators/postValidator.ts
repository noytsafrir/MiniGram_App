import Joi from 'joi';
import { createSanitizedTextSchema } from './validationSchema'; 

export const createPostSchema = Joi.object({
  caption: createSanitizedTextSchema(100, false), // optional caption
});
