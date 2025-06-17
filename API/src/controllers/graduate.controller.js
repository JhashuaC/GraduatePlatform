const Graduate = require('../models/graduate.model');
const User = require('../models/user.model');
const Career = require('../models/career.model');

const getAllGraduates = async (req, res) => {
  try {
    const graduates = await Graduate.findAll({ include: [User, Career] });
    res.json(graduates);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener graduados' });
  }
};

const getGraduateById = async (req, res) => {
  try {
    const graduate = await Graduate.findByPk(req.params.id, { include: [User, Career] });
    if (!graduate) return res.status(404).json({ message: 'Graduado no encontrado' });
    res.json(graduate);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar graduado' });
  }
};

const createGraduate = async (req, res) => {
  const { id_graduate, graduation_year, id_career, category, work_phone } = req.body;
  try {
    const graduate = await Graduate.create({
      id_graduate,
      graduation_year,
      id_career,
      category,
      work_phone,
    });
    res.status(201).json(graduate);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear graduado' });
  }
};

const updateGraduate = async (req, res) => {
  try {
    const graduate = await Graduate.findByPk(req.params.id);
    if (!graduate) return res.status(404).json({ message: 'Graduado no encontrado' });

    const { graduation_year, id_career, category, work_phone } = req.body;
    await graduate.update({ graduation_year, id_career, category, work_phone });

    res.json(graduate);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar graduado' });
  }
};

const deleteGraduate = async (req, res) => {
  try {
    const graduate = await Graduate.findByPk(req.params.id);
    if (!graduate) return res.status(404).json({ message: 'Graduado no encontrado' });
    await graduate.destroy();
    res.json({ message: 'Graduado eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar graduado' });
  }
};

module.exports = {
  getAllGraduates,
  getGraduateById,
  createGraduate,
  updateGraduate,
  deleteGraduate,
};
