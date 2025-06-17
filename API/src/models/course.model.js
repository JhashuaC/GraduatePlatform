const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Course = sequelize.define('Course', {
  id_course: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name_course: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  date_course: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  time_course: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  modality: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_speaker: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'courses',
  timestamps: false,
});

module.exports = Course;
