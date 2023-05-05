import Joi from 'joi';

export const createCategorySchema = Joi.object({
  name: Joi.string().required().error(new Error('Please provide a category name!')),
  parent: Joi.number(),
});

export const updateCategorySchema = Joi.object({
  id: Joi.number().required().error(new Error('Please provide a category id!')),
  name: Joi.string().required().error(new Error('Please provide a category name!')),
  parent: Joi.number(),
});
