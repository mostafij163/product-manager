import sequelize from './../config/database';
import CategorySchema from '../models/category';
import { createCategorySchema, updateCategorySchema } from '../utils/validation/reqBodyValidation';
import sendResponse from './../utils/responses/sendResponse';
import ProdCatMapsSchema from '../models/productCategoryMap';

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

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await CategorySchema.findAll();

    return sendResponse(res, 'success', categories, 200);
  } catch (error) {
    return next(error);
  }
};

export const getACategory = async (req, res, next) => {
  try {
    const category = await CategorySchema.findOne({ where: { id: req.params.id } });

    return sendResponse(res, 'success', category, 200);
  } catch (error) {
    return next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    await sequelize.transaction(async (t) => {
      await CategorySchema.destroy({
        where: {
          id: req.params.id,
        },
        transaction: t,
      });

      await ProdCatMapsSchema.destroy({
        where: {
          cat_id: req.params.id,
        },
        transaction: t,
      });
    });

    sendResponse(res, 'success', null, 204);
  } catch (error) {
    return next(error);
  }
};
