import Joi from "../utils/customJoi";

export const registerSchema = Joi.object({
  username: Joi.string().min(2).max(30).required().xss(),
  email: Joi.string().email().required().xss(),
  password: Joi.string().min(10).required(),
  firstName: Joi.string().min(2).max(50).required().xss(),
  lastName: Joi.string().min(2).max(50).required().xss(),
});

