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

export const addProductSchema = Joi.object({
  name: Joi.string().required().error(new Error('Please provide a product name!')),
  categoriesId: Joi.array()
    .items(Joi.number().required().error(new Error('Please provide a category!')))
    .required()
    .error(new Error('Please provide a product category!')),
  color: Joi.string(),
  size: Joi.string(),
  brand: Joi.string(),
});

export const updateProductSchema = Joi.object({
  id: Joi.number().required().error(new Error('Please provide a product id')),
  name: Joi.string().required().error(new Error('Please provide a product name!')),
  categoriesId: Joi.array()
    .items(Joi.number().required().error(new Error('Please provide a category!')))
    .required()
    .error(new Error('Please provide a product category!')),
  color: Joi.string(),
  size: Joi.string(),
  brand: Joi.string(),
});
