import Joi from 'joi';

export const validateSignUp = Joi.object({
  f_name: Joi.string().required().error(new Error('Please provide your first name!')),
  l_name: Joi.string().required().error(new Error('Please provide your last name!')),
  email: Joi.string().email().required().error(new Error('Please provide your email!')),
  phone: Joi.string().required().error(new Error('Please provide your phone!')),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required()
    .error(new Error('Please provide your password!')),
});
