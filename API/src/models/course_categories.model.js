const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CourseCategory = sequelize.define('CourseCategory', {
  id_course: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  id_option: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
}, {
  tableName: 'course_categories',
  timestamps: false,
});

module.exports = CourseCategory;

