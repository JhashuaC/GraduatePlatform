const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Course_Speaker = sequelize.define('Course_Speaker', {
  speaker_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  tableName: 'Course_Speaker',
  timestamps: false
});

module.exports = Course_Speaker;
