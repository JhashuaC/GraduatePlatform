const Speaker = require('../models/speaker.model');
const User = require('../models/user.model');

const getAllSpeakers = async (req, res) => {
  try {
    const speakers = await Speaker.findAll({ include: User });
    res.json(speakers);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener facilitadores' });
  }
};

const getSpeakerById = async (req, res) => {
  try {
    const speaker = await Speaker.findByPk(req.params.id, { include: User });
    if (!speaker) return res.status(404).json({ message: 'Facilitador no encontrado' });
    res.json(speaker);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar facilitador' });
  }
};

const createSpeaker = async (req, res) => {
  const { id_speaker, specialty, work_phone } = req.body;
  try {
    const speaker = await Speaker.create({ id_speaker, specialty, work_phone });
    res.status(201).json(speaker);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear facilitador' });
  }
};

const updateSpeaker = async (req, res) => {
  try {
    const speaker = await Speaker.findByPk(req.params.id);
    if (!speaker) return res.status(404).json({ message: 'Facilitador no encontrado' });

    const { specialty, work_phone } = req.body;
    await speaker.update({ specialty, work_phone });

    res.json(speaker);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar facilitador' });
  }
};

const deleteSpeaker = async (req, res) => {
  try {
    const speaker = await Speaker.findByPk(req.params.id);
    if (!speaker) return res.status(404).json({ message: 'Facilitador no encontrado' });
    await speaker.destroy();
    res.json({ message: 'Facilitador eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar facilitador' });
  }
};

module.exports = {
  getAllSpeakers,
  getSpeakerById,
  createSpeaker,
  updateSpeaker,
  deleteSpeaker,
};
