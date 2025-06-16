const { Graduate, Career } = require('../models');

const createGraduate = async (req, res) => {
  try {
    const graduate = await Graduate.create(req.body);
    res.status(201).json(graduate);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear egresado', error });
  }
};

const getAllGraduates = async (req, res) => {
  try {
    const graduates = await Graduate.findAll({ include: Career });
    res.status(200).json(graduates);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener egresados', error });
  }
};

const getGraduateById = async (req, res) => {
  try {
    const graduate = await Graduate.findByPk(req.params.id, { include: Career });
    if (!graduate) return res.status(404).json({ message: 'Egresado no encontrado' });
    res.status(200).json(graduate);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener egresado', error });
  }
};

const updateGraduate = async (req, res) => {
  try {
    const updated = await Graduate.update(req.body, { where: { id_graduate: req.params.id } });
    if (!updated[0]) return res.status(404).json({ message: 'Egresado no encontrado' });
    const updatedGraduate = await Graduate.findByPk(req.params.id);
    res.status(200).json(updatedGraduate);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar egresado', error });
  }
};

const deleteGraduate = async (req, res) => {
  try {
    const deleted = await Graduate.destroy({ where: { id_graduate: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Egresado no encontrado' });
    res.status(200).json({ message: 'Egresado eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar egresado', error });
  }
};

module.exports = {
  createGraduate,
  getAllGraduates,
  getGraduateById,
  updateGraduate,
  deleteGraduate
};
