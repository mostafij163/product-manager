import { DataTypes, literal } from 'sequelize';
import sequelize from '../config/database';
import ProductSchema from './product';
import ProdCatMapsSchema from './productCategoryMap';

const { INTEGER, STRING } = DataTypes;

const CategorySchema = sequelize.define(
  'categories',
  {
    name: {
      type: STRING,
      allowNull: false,
    },
    parent: {
      type: INTEGER,
      allowNull: false,
    },
    created_at: {
      type: 'TIMESTAMP',
      defaultValue: literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: 'TIMESTAMP',
      defaultValue: literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    timestamps: true,
    SCHEMA: process.env.SCHEMA,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

CategorySchema.belongsToMany(ProductSchema, { through: ProdCatMapsSchema, foreignKey: 'cat_id' });
ProductSchema.belongsToMany(CategorySchema, { through: ProdCatMapsSchema, foreignKey: 'prod_id' });

export default CategorySchema;
