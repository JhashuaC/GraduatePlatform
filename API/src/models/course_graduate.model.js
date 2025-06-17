const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CourseGraduate = sequelize.define('CourseGraduate', {
  id_course: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  id_graduate: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  completed_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'course_graduate',
  timestamps: false,
});

module.exports = CourseGraduate;
