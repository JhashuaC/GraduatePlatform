const Career = require('../models/career.model');

const getAllCareers = async (req, res) => {
  try {
    const careers = await Career.findAll();
    res.json(careers);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener carreras' });
  }
};

const getCareerById = async (req, res) => {
  try {
    const career = await Career.findByPk(req.params.id);
    if (!career) return res.status(404).json({ message: 'Carrera no encontrada' });
    res.json(career);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar carrera' });
  }
};

const createCareer = async (req, res) => {
  try {
    const career = await Career.create({
      name: req.body.name,
      area: req.body.area,
    });
    res.status(201).json(career);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear carrera' });
  }
};

const updateCareer = async (req, res) => {
  try {
    const career = await Career.findByPk(req.params.id);
    if (!career) return res.status(404).json({ message: 'Carrera no encontrada' });
    await career.update({
      name: req.body.name,
      area: req.body.area,
    });
    res.json(career);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar carrera' });
  }
};

const deleteCareer = async (req, res) => {
  try {
    const career = await Career.findByPk(req.params.id);
    if (!career) return res.status(404).json({ message: 'Carrera no encontrada' });
    await career.destroy();
    res.json({ message: 'Carrera eliminada' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar carrera' });
  }
};

module.exports = {
  getAllCareers,
  getCareerById,
  createCareer,
  updateCareer,
  deleteCareer,
};
