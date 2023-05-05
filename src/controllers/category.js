import CategorySchema from '../models/category';
import { createCategorySchema } from '../utils/validation/validations';
import sendResponse from './../utils/responses/sendResponse';

export const createCategory = async (req, res, next) => {
  try {
    const { name, parent } = req.body;

    await createCategorySchema.validateAsync(req.body);

    const newCategory = await CategorySchema.create(
      { name, parent },
      {
        returning: true,
      }
    );

    sendResponse(res, 'success', newCategory, 201);
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;
    return next(error);
  }
};
