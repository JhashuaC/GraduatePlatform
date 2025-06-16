const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Role = require('./role.model');

const User = sequelize.define('User', {
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: { type: DataTypes.STRING(100), allowNull: false },
  password: { type: DataTypes.STRING(100), allowNull: false },
  id_role: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Role,
      key: 'id_role'
    }
  }
}, {
  tableName: 'User',
  timestamps: false
});

module.exports = User;

