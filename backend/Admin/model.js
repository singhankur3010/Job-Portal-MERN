const { Sequelize, DataTypes } = require('sequelize')

const sequelize = require('../db');

const Admin = sequelize.define(
  'Admin', {

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false, 
    unique: true
  },
  phoneNo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});



module.exports = Admin;

