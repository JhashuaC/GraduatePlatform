const { Speaker, Course } = require('../models');

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({ include: Speaker });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener cursos' });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id, { include: Speaker });
    if (!course) return res.status(404).json({ message: 'Curso no encontrado' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar curso' });
  }
};

const createCourse = async (req, res) => {
  const { name_course, description, date_course, time_course, modality, id_speaker } = req.body;
  try {
    const course = await Course.create({
      name_course,
      description,
      date_course,
      time_course,
      modality,
      id_speaker,
    });
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear curso' });
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: 'Curso no encontrado' });

    const { name_course, description, date_course, time_course, modality, id_speaker } = req.body;
    await course.update({
      name_course,
      description,
      date_course,
      time_course,
      modality,
      id_speaker,
    });

    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar curso' });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: 'Curso no encontrado' });
    await course.destroy();
    res.json({ message: 'Curso eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar curso' });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
