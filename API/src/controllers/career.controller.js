const { Career } = require('../models');

const createCareer = async (req, res) => {
  try {
    const { area, name } = req.body;
    const newCareer = await Career.create({ area, name });
    res.status(201).json(newCareer);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear carrera', error });
  }
};

const getAllCareers = async (req, res) => {
  try {
    const careers = await Career.findAll();
    res.status(200).json(careers);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener carreras', error });
  }
};

const getCareerById = async (req, res) => {
  try {
    const { id } = req.params;
    const career = await Career.findByPk(id);
    if (!career) return res.status(404).json({ message: 'Carrera no encontrada' });
    res.status(200).json(career);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener carrera', error });
  }
};

const updateCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const { area, name } = req.body;

    const [updated] = await Career.update({ area, name }, { where: { id_career: id } });
    if (!updated) return res.status(404).json({ message: 'Carrera no encontrada' });

    const updatedCareer = await Career.findByPk(id);
    res.status(200).json(updatedCareer);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar carrera', error });
  }
};

const deleteCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Career.destroy({ where: { id_career: id } });
    if (!deleted) return res.status(404).json({ message: 'Carrera no encontrada' });
    res.status(200).json({ message: 'Carrera eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar carrera', error });
  }
};

module.exports = {
  createCareer,
  getAllCareers,
  getCareerById,
  updateCareer,
  deleteCareer
};
