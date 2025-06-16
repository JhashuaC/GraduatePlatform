const { Course, Category } = require('../models');

const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear curso', error });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({ include: Category });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cursos', error });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id, { include: Category });
    if (!course) return res.status(404).json({ message: 'Curso no encontrado' });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener curso', error });
  }
};

const updateCourse = async (req, res) => {
  try {
    const updated = await Course.update(req.body, { where: { id_course: req.params.id } });
    if (!updated[0]) return res.status(404).json({ message: 'Curso no encontrado' });
    const updatedCourse = await Course.findByPk(req.params.id);
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar curso', error });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const deleted = await Course.destroy({ where: { id_course: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Curso no encontrado' });
    res.status(200).json({ message: 'Curso eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar curso', error });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse
};
