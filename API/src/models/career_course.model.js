const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CareerCourse = sequelize.define('CareerCourse', {
  id_career: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  id_course: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
}, {
  tableName: 'career_course',
  timestamps: false,
});

module.exports = CareerCourse;
