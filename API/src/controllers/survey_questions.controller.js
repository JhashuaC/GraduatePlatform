const SurveyQuestion = require('../models/survey_questions.model');

const getAllQuestions = async (req, res) => {
  try {
    const questions = await SurveyQuestion.findAll();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener preguntas' });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const question = await SurveyQuestion.findByPk(req.params.id);
    if (!question) return res.status(404).json({ message: 'Pregunta no encontrada' });
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar pregunta' });
  }
};

const createQuestion = async (req, res) => {
  const { text, category } = req.body;
  try {
    const question = await SurveyQuestion.create({ text, category });
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear pregunta' });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const question = await SurveyQuestion.findByPk(req.params.id);
    if (!question) return res.status(404).json({ message: 'Pregunta no encontrada' });
    await question.update({
      text: req.body.text,
      category: req.body.category,
    });
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar pregunta' });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const question = await SurveyQuestion.findByPk(req.params.id);
    if (!question) return res.status(404).json({ message: 'Pregunta no encontrada' });
    await question.destroy();
    res.json({ message: 'Pregunta eliminada' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar pregunta' });
  }
};

module.exports = {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
