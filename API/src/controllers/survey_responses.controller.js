const SurveyResponse = require('../models/survey_responses.model');

const getAllResponses = async (req, res) => {
  try {
    const responses = await SurveyResponse.findAll();
    res.json(responses);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener respuestas' });
  }
};

const getResponsesByGraduate = async (req, res) => {
  try {
    const responses = await SurveyResponse.findAll({
      where: { id_graduate: req.params.id_graduate },
    });
    res.json(responses);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener respuestas del graduado' });
  }
};

const submitResponse = async (req, res) => {
  const { id_graduate, id_course, id_question, answer_text } = req.body;
  try {
    const response = await SurveyResponse.create({
      id_graduate,
      id_course,
      id_question,
      answer_text,
    });
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar respuesta' });
  }
};

module.exports = {
  getAllResponses,
  getResponsesByGraduate,
  submitResponse,
};
