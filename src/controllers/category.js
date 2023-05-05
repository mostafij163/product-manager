import CategorySchema from '../models/category';
import { createCategorySchema, updateCategorySchema } from '../utils/validation/validations';
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
    return next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    await updateCategorySchema.validateAsync(req.body);

    const { id, name, parent } = req.body;

    const caterory = await CategorySchema.update(
      {
        name,
        parent,
      },
      {
        where: { id },
        returning: true,
      }
    );
    return sendResponse(res, 'success', caterory[1][0], 201);
  } catch (error) {
    return next(error);
  }
};
