const GraduatePreference = require('../models/graduate_preferences.model');

const assignPreferenceToGraduate = async (req, res) => {
  const { id_graduate, id_option } = req.body;
  try {
    const entry = await GraduatePreference.create({ id_graduate, id_option });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: 'Error al asignar preferencia al graduado' });
  }
};

const removePreferenceFromGraduate = async (req, res) => {
  const { id_graduate, id_option } = req.params;
  try {
    const deleted = await GraduatePreference.destroy({ where: { id_graduate, id_option } });
    if (!deleted) return res.status(404).json({ message: 'Preferencia no encontrada' });
    res.json({ message: 'Preferencia removida del graduado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al remover preferencia' });
  }
};

module.exports = {
  assignPreferenceToGraduate,
  removePreferenceFromGraduate,
};
