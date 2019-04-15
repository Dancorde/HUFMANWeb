const Sequelize = require("sequelize");

const sequelize = require("../config/database.js");

const CompVant = require("./compvant");
const Phase = require("./phase");

const Participate = sequelize.define("compvant", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  phaseBehaviour: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.ENUM('0', '1'),
    allowNull: false
  }
});

Participate.belongsTo(CompVant, { foreignKey: 'typeId', targetKey: 'typeId' });
Participate.belongsTo(CompVant, { foreignKey: 'valueId', targetKey: 'valueId' });
Participate.belongsTo(CompVant, { foreignKey: 'name', targetKey: 'name', as: 'compName' });

Participate.belongsTo(Phase, { foreignKey: 'name', targetKey: 'name' });
Participate.belongsTo(Phase, { foreignKey: 'missionId', targetKey: 'missionId' });

module.exports = Participate;
