const { Career, Course, CareerCourse } = require('../models');

const getAllCareerCourses = async (req, res) => {
  try {
    const data = await CareerCourse.findAll({
      include: [Career, Course],
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener relaciones carrera-curso' });
  }
};

const getCareerCourse = async (req, res) => {
  const { id_career, id_course } = req.params;
  try {
    const data = await CareerCourse.findOne({
      where: { id_career, id_course },
      include: [Career, Course],
    });
    if (!data) return res.status(404).json({ message: 'Relación no encontrada' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar relación' });
  }
};

const assignCourseToCareer = async (req, res) => {
  const { id_career, id_course } = req.body;
  try {
    const created = await CareerCourse.create({ id_career, id_course });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: 'Error al asignar curso a carrera' });
  }
};

const removeCourseFromCareer = async (req, res) => {
  const { id_career, id_course } = req.params;
  try {
    const deleted = await CareerCourse.destroy({ where: { id_career, id_course } });
    if (!deleted) return res.status(404).json({ message: 'Relación no encontrada' });
    res.json({ message: 'Curso removido de la carrera' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar relación' });
  }
};

module.exports = {
  getAllCareerCourses,
  getCareerCourse,
  assignCourseToCareer,
  removeCourseFromCareer,
};
