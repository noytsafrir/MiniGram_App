import Joi from 'joi';
import xss from 'xss';

export const createPostSchema = Joi.object({
  caption: Joi.string()
    .max(100)
    .optional()
    .custom((value, helpers) => {
      const sanitizedValue = xss(value);
      if (sanitizedValue !== value) {
        return helpers.error('string.xss');
      }
      return sanitizedValue;
    })
    .messages({
      'string.base': 'Caption must be a text.',
      'string.max':  'Caption must be at most 100 characters.',
      'string.xss':  'Caption contains invalid or dangerous content.',
    }),
});
