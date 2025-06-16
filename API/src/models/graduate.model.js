const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Career = require('./career.model');

const Graduate = sequelize.define('Graduate', {
  id_graduate: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: { type: DataTypes.STRING(100), allowNull: false },
  identification: { type: DataTypes.STRING(20), allowNull: false },
  address: { type: DataTypes.STRING(200), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false },
  phone: { type: DataTypes.STRING(20), allowNull: false },
  work_phone: { type: DataTypes.STRING(20), allowNull: false },
  graduation_year: { type: DataTypes.INTEGER, allowNull: false },
  id_career: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Career,
      key: 'id_career'
    }
  }
}, {
  tableName: 'Graduate',
  timestamps: false
});

module.exports = Graduate;
