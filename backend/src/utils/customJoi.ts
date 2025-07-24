import JoiBase from "joi";
import xss from "xss";

const Joi = JoiBase.extend((joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.xss": "{{#label}} contains disallowed HTML or script content",
  },
  rules: {
    xss: {
      method() {
        return this.$_addRule({ name: "xss" });
      },
      validate(value, helpers) {
        const sanitized = xss(value);        
        if (sanitized !== value) {
          return helpers.error("string.xss");
        }
        return sanitized;
      },
    },
  },
}));

export default Joi;