const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const GraduatePreference = sequelize.define('GraduatePreference', {
  id_graduate: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  id_option: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
}, {
  tableName: 'graduate_preferences',
  timestamps: false,
});

module.exports = GraduatePreference;
