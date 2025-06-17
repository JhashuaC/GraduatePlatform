const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SurveyResponse = sequelize.define('SurveyResponse', {
  id_response: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_graduate: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_course: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_question: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  answer_text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'survey_responses',
  timestamps: false,
});

module.exports = SurveyResponse;
