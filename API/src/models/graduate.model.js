const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Graduate = sequelize.define('Graduate', {
  id_graduate: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  graduation_year: {
    type: DataTypes.STRING(4),
    allowNull: true,
  },
  id_career: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  work_phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
}, {
  tableName: 'graduates',
  timestamps: false,
});

module.exports = Graduate;
