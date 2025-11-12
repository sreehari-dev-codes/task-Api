import Joi from "joi";

export const createTaskSchema = Joi.object({
  title: Joi.string().min(1).required(),
  description: Joi.string().optional(),
  status: Joi.string().valid("todo", "in-progress", "done").optional(),
  dueDate: Joi.date().optional()
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  status: Joi.string().valid("todo", "in-progress", "done").optional(),
  dueDate: Joi.date().optional()
});
