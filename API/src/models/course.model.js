const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./category.model');

const Course = sequelize.define('Course', {
  id_course: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: { type: DataTypes.STRING(100), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  time: { type: DataTypes.TIME, allowNull: false },
  id_category: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'id_category'
    }
  },
  modality: { type: DataTypes.STRING(50), allowNull: false }
}, {
  tableName: 'Course',
  timestamps: false
});

module.exports = Course;
