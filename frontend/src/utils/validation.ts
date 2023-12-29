import Joi from "joi";

const commentValidation = (body: { [k: string]: FormDataEntryValue }) => {
  const commentSchema = Joi.object({
    content: Joi.string().min(10).required(),
    decisionId: Joi.string().required(),
    userId: Joi.string().required(),
  });

  return commentSchema.validate(body);
};

const registerValidation = (body: { [k: string]: FormDataEntryValue }) => {
  const registerSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    position: Joi.string().required(),
    serviceId: Joi.string().required(),
    password: Joi.string()
      // password rules : at least one uppercase letter, one lowercase letter, one digit, one special character and min 8 characters
      .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      .required(),
    confirmedPassword: Joi.ref("password"),
    cgu: Joi.string().pattern(/^(on)$/),
  }).with("password", "confirmedPassword");

  return registerSchema.validate(body);
};

const loginValidation = (body: { [k: string]: FormDataEntryValue }) => {
  const loginSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string()
      // password rules : at least one uppercase letter, one lowercase letter, one digit, one special character and min 8 characters
      .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      .required(),
  });

  return loginSchema.validate(body);
};

export { commentValidation, loginValidation, registerValidation };
