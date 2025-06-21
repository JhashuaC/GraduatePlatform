const { SurveyResponse, SurveyQuestion, Graduate } = require('../models');

const getAllSurveyResponses = async (req, res) => {
  try {
    const data = await SurveyResponse.findAll({
      include: [SurveyQuestion, Graduate],
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener respuestas de la encuesta' });
  }
};

const getSurveyResponse = async (req, res) => {
  const { id_question, id_graduate } = req.params;
  try {
    const data = await SurveyResponse.findOne({
      where: { id_pregunta: id_question, id_graduado: id_graduate },
      include: [SurveyQuestion, Graduate],
    });
    if (!data) return res.status(404).json({ message: 'Respuesta no encontrada' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar respuesta' });
  }
};

const createSurveyResponse = async (req, res) => {
  const { id_pregunta, id_graduado, respuesta } = req.body;
  try {
    const created = await SurveyResponse.create({ id_pregunta, id_graduado, respuesta });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar respuesta' });
  }
};

const updateSurveyResponse = async (req, res) => {
  const { id_question, id_graduate } = req.params;
  try {
    const response = await SurveyResponse.findOne({
      where: { id_pregunta: id_question, id_graduado: id_graduate },
    });
    if (!response) return res.status(404).json({ message: 'Respuesta no encontrada' });
    await response.update(req.body);
    res.json(response);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar respuesta' });
  }
};

const deleteSurveyResponse = async (req, res) => {
  const { id_question, id_graduate } = req.params;
  try {
    const deleted = await SurveyResponse.destroy({
      where: { id_pregunta: id_question, id_graduado: id_graduate },
    });
    if (!deleted) return res.status(404).json({ message: 'Respuesta no encontrada' });
    res.json({ message: 'Respuesta eliminada' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar respuesta' });
  }
};

module.exports = {
  getAllSurveyResponses,
  getSurveyResponse,
  createSurveyResponse,
  updateSurveyResponse,
  deleteSurveyResponse,
};
