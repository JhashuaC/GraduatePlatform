const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Role = sequelize.define('Role', {
  id_role: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'Role',
  timestamps: false
});

module.exports = Role;
