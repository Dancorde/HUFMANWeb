const Sequelize = require("sequelize");

const sequelize = require("../config/database.js");

const VANT = require("./vant");
const Component = require("./component");

const CompVant = sequelize.define("compvant", {
  compVantId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

CompVant.belongsTo(VANT, { foreignKey: 'typeId', targetKey: 'typeId' });
CompVant.belongsTo(VANT, { foreignKey: 'valueId' ,targetKey: 'valueId' });

CompVant.belongsTo(Component, { foreignKey: 'name', targetKey: 'name' });

module.exports = CompVant;
