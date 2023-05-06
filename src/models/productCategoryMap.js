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
    timestamps: false,
    SCHEMA: process.env.SCHEMA,
  }
);

CategorySchema.belongsToMany(ProductSchema, { through: ProdCatMapsSchema, foreignKey: 'cat_id' });
ProductSchema.belongsToMany(CategorySchema, { through: ProdCatMapsSchema, foreignKey: 'prod_id' });

ProductSchema.hasMany(ProdCatMapsSchema, { foreignKey: 'prod_id', as: 'categoriesId' });
ProdCatMapsSchema.belongsTo(ProductSchema, { foreignKey: 'prod_id', as: 'categoriesId' });

export default ProdCatMapsSchema;
