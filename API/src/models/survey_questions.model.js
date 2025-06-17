const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SurveyQuestion = sequelize.define('SurveyQuestion', {
  id_question: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  tableName: 'survey_questions',
  timestamps: false,
});

module.exports = SurveyQuestion;
