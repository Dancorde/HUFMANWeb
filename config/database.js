const Sequelize = require('sequelize');

const sequelize = new Sequelize('hufmanweb', 'root', 'password', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;