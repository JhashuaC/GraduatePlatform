const PreferenceOption = require('../models/preference_options.model');

const getAllPreferences = async (req, res) => {
  try {
    const options = await PreferenceOption.findAll();
    res.json(options);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener preferencias' });
  }
};

const getPreferenceById = async (req, res) => {
  try {
    const option = await PreferenceOption.findByPk(req.params.id);
    if (!option) return res.status(404).json({ message: 'Preferencia no encontrada' });
    res.json(option);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar preferencia' });
  }
};

const createPreference = async (req, res) => {
  try {
    const newOption = await PreferenceOption.create({ name: req.body.name });
    res.status(201).json(newOption);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear preferencia' });
  }
};

const updatePreference = async (req, res) => {
  try {
    const option = await PreferenceOption.findByPk(req.params.id);
    if (!option) return res.status(404).json({ message: 'Preferencia no encontrada' });
    await option.update({ name: req.body.name });
    res.json(option);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar preferencia' });
  }
};

const deletePreference = async (req, res) => {
  try {
    const option = await PreferenceOption.findByPk(req.params.id);
    if (!option) return res.status(404).json({ message: 'Preferencia no encontrada' });
    await option.destroy();
    res.json({ message: 'Preferencia eliminada' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar preferencia' });
  }
};

module.exports = {
  getAllPreferences,
  getPreferenceById,
  createPreference,
  updatePreference,
  deletePreference,
};
