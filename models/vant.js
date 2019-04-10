const Sequelize = require("sequelize");

const sequelize = require("../config/database.js");

const VANT = sequelize.define("vant", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  typeId: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  valueId: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  model: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  manufacturer: {
    type: Sequelize.STRING,
    allowNull: false
  },
  comunication: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tecType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tecAddress: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = VANT;
