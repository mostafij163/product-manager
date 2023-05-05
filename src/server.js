import app from './app';
import sequelize from './config/database';
// import CategorySchema from './models/category';
// import ProductSchema from './models/product';
// import ProdCatMapsSchema from './models/productCategoryMap';

// CategorySchema.sync();
// ProductSchema.sync();
// ProdCatMapsSchema.sync();

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Failed!!! Please check your connection credentials!');
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`The server is running on port ${port} in ${process.env.STAGE} mode`);
});
