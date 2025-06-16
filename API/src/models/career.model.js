const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Career = sequelize.define('Career', {
  id_career: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  area: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'Career',
  timestamps: false
});

module.exports = Career;
