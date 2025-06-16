const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Course_Graduate = sequelize.define('Course_Graduate', {
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  graduate_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  tableName: 'Course_Graduate',
  timestamps: false
});

module.exports = Course_Graduate;
