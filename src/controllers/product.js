import sequelize from './../config/database';
import { addProductSchema } from '../utils/validation/reqBodyValidation';
import ProductSchema from './../models/product';
import sendResponse from './../utils/responses/sendResponse';
import ProdCatMapsSchema from '../models/productCategoryMap';

export const addProduct = async (req, res, next) => {
  try {
    await addProductSchema.validateAsync(req.body);

    const products = await sequelize.transaction(async (t) => {
      const newProduct = await ProductSchema.create(req.body, {
        returning: true,
        raw: true,
        transaction: t,
      });

      const prodCatMap = req.body.categoriesId.map((id) => ({
        prod_id: newProduct.id,
        cat_id: id,
      }));

      await ProdCatMapsSchema.bulkCreate(prodCatMap, {
        returning: true,
        raw: true,
        transaction: t,
      });

      return newProduct;
    });

    return sendResponse(res, 'success', products, 201);
  } catch (error) {
    return next(error);
  }
};
