import Joi from "joi";
import { CommentType } from "./types";

const commentValidation = (body: { [k: string]: FormDataEntryValue }) => {
  const commentSchema = Joi.object({
    content: Joi.string().min(10).required(),
    decisionId: Joi.string().required(),
    userId: Joi.string().required(),
  });

  return commentSchema.validate(body);
};

export { commentValidation };
