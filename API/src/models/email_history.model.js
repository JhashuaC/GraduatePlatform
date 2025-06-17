const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EmailHistory = sequelize.define('EmailHistory', {
  id_email: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_admin: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  sent_to: {
    type: DataTypes.ENUM('todos', 'inscritos', 'carrera'),
    defaultValue: 'todos',
  },
  carrera_filtrada: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  sent_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'email_history',
  timestamps: false,
});

module.expo
