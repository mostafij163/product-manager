import sequelize from 'sequelize';

const db = new sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.HOST,
  dialect: process.env.DB_DIALECT,
  logging: process.env.STAGE === 'Development' ? true : false,
});

export default db;
