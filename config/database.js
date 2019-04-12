const Sequelize = require('sequelize');

const sequelize = new Sequelize("hufmanweb", process.env.DB_USER, process.env.DB_PASS, {
  dialect: "mysql",
  host: process.env.DB_HOST
});

module.exports = sequelize;