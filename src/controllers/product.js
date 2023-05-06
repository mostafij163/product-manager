import Sequelize from 'sequelize';
import sequelize from './../config/database';
import { addProductSchema, getProductsSchema, updateProductSchema } from '../utils/validation/reqBodyValidation';
import ProductSchema from './../models/product';
import sendResponse from './../utils/responses/sendResponse';
import ProdCatMapsSchema from '../models/productCategoryMap';

const { QueryTypes, Op } = Sequelize;

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

export const updateProduct = async (req, res, next) => {
  try {
    await updateProductSchema.validateAsync(req.body);
    const { id, categoriesId } = req.body;

    const products = await sequelize.transaction(async (t) => {
      const updatedProduct = await ProductSchema.update(req.body, {
        where: {
          id: id,
        },
        returning: true,
        raw: true,
        transaction: t,
      });

      await sequelize.query(
        `
          DELETE FROM
              prod_cat_maps
          WHERE
              prod_id = ${id}
              and cat_id NOT IN (${categoriesId.join(', ')});
        `,
        { transaction: t }
      );

      const prodCatMap = categoriesId.map((catId) => `(${id}, ${catId})`).join(', ');

      await sequelize.query(
        `
          INSERT INTO prod_cat_maps (prod_id, cat_id)
          VALUES  ${prodCatMap}
          ON CONFLICT DO NOTHING ;
        `,
        { transaction: t }
      );

      const catsId = await sequelize.query(
        `
        SELECT cat_id 
        FROM prod_cat_maps
        WHERE prod_id = ${id}
      `,
        { transaction: t, type: QueryTypes.SELECT }
      );

      updatedProduct[1][0].categoriesId = catsId.map((cat) => cat.cat_id);
      return updatedProduct[1][0];
    });

    return sendResponse(res, 'success', products, 201);
  } catch (error) {
    return next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    await getProductsSchema.validateAsync(req.body);
    const { name, brand, color, categoriesId } = req.body;

    const searchCats = categoriesId
      ? {
          cat_id: categoriesId,
        }
      : {};

    let products = await ProductSchema.findAll({
      where: {
        name: { [Op.iLike]: `%${name ? name : ' '}%` },
        name: { [Op.iLike]: `%${brand ? brand : ' '}%` },
        name: { [Op.iLike]: `%${color ? color : ' '}%` },
      },
      include: {
        model: ProdCatMapsSchema,
        attributes: [],
        as: 'categoriesId',
        required: true,
        where: searchCats,
      },
    });

    return sendResponse(res, 'success', products, 200);
  } catch (error) {
    return next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    let product = await ProductSchema.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: ProdCatMapsSchema,
        attributes: [['cat_id', 'id']],
        as: 'categoriesId',
        required: true,
      },
    });

    return sendResponse(res, 'success', product, 200);
  } catch (error) {
    return next(error);
  }
};
