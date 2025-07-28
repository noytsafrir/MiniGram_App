import Joi from 'joi';
import xss from 'xss';

export const createSanitizedTextSchema = (
  maxLength: number,
  isRequired = false
) => {
     let schema = Joi.string()
    .max(maxLength)
    .custom((value, helpers) => {
      const sanitized = xss(value);
      if (sanitized !== value) {
        return helpers.error("string.xss");
      }
      return sanitized;
    })
    .messages({
      "string.base": "Text must be a string.",
      "string.max": `Text must be at most ${maxLength} characters.`,
      "string.xss": "Text contains invalid or dangerous content.",
    });
      return isRequired ? schema.required() : schema.allow("", null).optional();
};