require('dotenv').config();

const {
  DB_USERNAME, DB_USER_PASSWORD, DB_NAME, DB_HOST, DB_DIALECT,
} = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_USER_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
    seederStorage: 'sequelize',
    seederStorageTableName: 'SequelizeData',
  },
};