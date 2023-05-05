import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import ProductSchema from './product';
import CategorySchema from './category';

const { INTEGER } = DataTypes;

const ProdCatMapsSchema = sequelize.define(
  'prod_cat_maps',
  {
    prod_id: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: ProductSchema,
        key: 'id',
      },
    },
    cat_id: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: CategorySchema,
        key: 'id',
      },
    },
  },
  {
    timestamp: false,
    SCHEMA: process.env.SCHEMA,
  }
);

export default ProdCatMapsSchema;
