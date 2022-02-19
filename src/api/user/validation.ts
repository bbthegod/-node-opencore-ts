import { Joi } from 'express-validation';

export default {
  create: {
    body: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
      status: Joi.string().required()
    }),
  },

  update: {
    body: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
      status: Joi.string().required()
    }),
    params: { userId: Joi.string().hex().required() },
  },
};
