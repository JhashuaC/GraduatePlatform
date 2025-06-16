const { Speaker } = require('../models');

const createSpeaker = async (req, res) => {
  try {
    const speaker = await Speaker.create(req.body);
    res.status(201).json(speaker);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear ponente', error });
  }
};

const getAllSpeakers = async (req, res) => {
  try {
    const speakers = await Speaker.findAll();
    res.status(200).json(speakers);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener ponentes', error });
  }
};

const getSpeakerById = async (req, res) => {
  try {
    const speaker = await Speaker.findByPk(req.params.id);
    if (!speaker) return res.status(404).json({ message: 'Ponente no encontrado' });
    res.status(200).json(speaker);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener ponente', error });
  }
};

const updateSpeaker = async (req, res) => {
  try {
    const updated = await Speaker.update(req.body, { where: { id_speaker: req.params.id } });
    if (!updated[0]) return res.status(404).json({ message: 'Ponente no encontrado' });
    const updatedSpeaker = await Speaker.findByPk(req.params.id);
    res.status(200).json(updatedSpeaker);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar ponente', error });
  }
};

const deleteSpeaker = async (req, res) => {
  try {
    const deleted = await Speaker.destroy({ where: { id_speaker: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Ponente no encontrado' });
    res.status(200).json({ message: 'Ponente eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar ponente', error });
  }
};

module.exports = {
  createSpeaker,
  getAllSpeakers,
  getSpeakerById,
  updateSpeaker,
  deleteSpeaker
};
