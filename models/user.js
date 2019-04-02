const Sequelize = require('sequelize');
const bcrypt = require("bcryptjs");

const sequelize = require('../config/database.js');

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, 
{
  hooks: {
    beforeCreate: (user) => {
      const salt = bcrypt.genSaltSync(12);
      user.password = bcrypt.hashSync(user.password, salt);
    },
    beforeUpdate: (user) => {
      const salt = bcrypt.genSaltSync(12);
      user.password = bcrypt.hashSync(user.password, salt);
    }
  }
});

module.exports = User;