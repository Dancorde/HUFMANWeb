const Sequelize = require("sequelize");

const sequelize = require("../config/database.js");

const Mission = require("./mission");

const Phase = sequelize.define("phase", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Mission.hasMany(Phase);

module.exports = Phase;
