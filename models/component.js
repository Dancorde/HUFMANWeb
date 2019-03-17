const Sequelize = require("sequelize");

const sequelize = require("../config/database.js");

const Component = sequelize.define("component", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: false
  },
  serialNumber: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Component;
