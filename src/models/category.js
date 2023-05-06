import { DataTypes, literal } from 'sequelize';
import sequelize from '../config/database';

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
      allowNull: true,
      references: {
        model: {
          tableName: 'categories',
        },
        key: 'id',
      },
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

export default CategorySchema;
