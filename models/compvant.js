const Sequelize = require("sequelize");

const sequelize = require("../config/database.js");

const VANT = require("./vant");
const Component = require("./component");

const CompVant = sequelize.define("compvant", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

CompVant.belongsTo(VANT, { foreignKey: 'id', targetKey: 'typeId' });
CompVant.belongsTo(VANT, { foreignKey: 'id' ,targetKey: 'valueId' });

CompVant.belongsTo(Component, { foreignKey: 'id', targetKey: 'name' });

module.exports = CompVant;
