const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Speaker = sequelize.define('Speaker', {
  id_speaker: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  specialty: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  work_phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
}, {
  tableName: 'speakers',
  timestamps: false,
});

module.exports = Speaker;
