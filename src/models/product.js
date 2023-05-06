import { DataTypes, literal } from 'sequelize';
import sequelize from '../config/database';

const { STRING } = DataTypes;

const ProductSchema = sequelize.define(
  'products',
  {
    name: {
      type: STRING,
      allowNull: false,
    },
    color: {
      type: STRING,
      allowNull: true,
    },
    size: {
      type: STRING,
      allowNull: true,
    },
    brand: {
      type: STRING,
      allowNull: true,
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

export default ProductSchema;
