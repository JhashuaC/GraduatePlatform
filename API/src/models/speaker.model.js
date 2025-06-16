const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Speaker = sequelize.define('Speaker', {
  id_speaker: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: { type: DataTypes.STRING(100), allowNull: false },
  address: { type: DataTypes.STRING(200), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false },
  phone: { type: DataTypes.STRING(20), allowNull: false },
  work_phone: { type: DataTypes.STRING(20), allowNull: false },
  specialty: { type: DataTypes.STRING(100), allowNull: false }
}, {
  tableName: 'Speaker',
  timestamps: false
});

module.exports = Speaker;
