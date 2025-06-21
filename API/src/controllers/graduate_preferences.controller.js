const { GraduatePreference, Graduate, PreferenceOption } = require('../models');

const getAllGraduatePreferences = async (req, res) => {
  try {
    const data = await GraduatePreference.findAll({
      include: [Graduate, PreferenceOption],
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener preferencias de graduados' });
  }
};

const getGraduatePreference = async (req, res) => {
  const { id_graduate, id_option } = req.params;
  try {
    const data = await GraduatePreference.findOne({
      where: { id_graduate, id_option },
      include: [Graduate, PreferenceOption],
    });
    if (!data) return res.status(404).json({ message: 'Relación no encontrada' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar relación' });
  }
};

const assignPreferenceToGraduate = async (req, res) => {
  const { id_graduate, id_option } = req.body;
  try {
    const created = await GraduatePreference.create({ id_graduate, id_option });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: 'Error al asignar preferencia' });
  }
};

const removePreferenceFromGraduate = async (req, res) => {
  const { id_graduate, id_option } = req.params;
  try {
    const deleted = await GraduatePreference.destroy({ where: { id_graduate, id_option } });
    if (!deleted) return res.status(404).json({ message: 'Relación no encontrada' });
    res.json({ message: 'Preferencia removida del graduado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar relación' });
  }
};

module.exports = {
  getAllGraduatePreferences,
  getGraduatePreference,
  assignPreferenceToGraduate,
  removePreferenceFromGraduate,
};
