const Sequelize = require('sequelize');

const sequelize = require('../config/database.js');

const Mission = sequelize.define("mission", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  client: {
    type: Sequelize.STRING,
    allowNull: false
  },
  architeture: {
    type: Sequelize.STRING,
    allowNull: false
  },
  centralVant: {
    type: Sequelize.STRING,
    allowNull: false
  },
  formation: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Mission;