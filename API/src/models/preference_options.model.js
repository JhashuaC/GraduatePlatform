const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PreferenceOption = sequelize.define('PreferenceOption', {
  id_option: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
}, {
  tableName: 'preference_options',
  timestamps: false,
});

module.exports = PreferenceOption;
