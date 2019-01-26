const Sequelize = require('sequelize');

const sequelize = new Sequelize('hufmanweb', 'root', null, {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;