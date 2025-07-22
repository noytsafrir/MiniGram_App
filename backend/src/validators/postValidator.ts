import Joi from 'joi';

export const createPostSchema = Joi.object({
  caption: Joi.string()
    .max(100)
    .optional()
    .messages({
      'string.base': 'Caption must be a text.',
      'string.max': 'Caption must be at most 100 characters.',
    }),
});
