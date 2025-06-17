const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EmailRecipient = sequelize.define('EmailRecipient', {
  id_email: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  id_graduate: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: 'email_recipients',
  timestamps: false,
});

module.exports = EmailRecipient;
