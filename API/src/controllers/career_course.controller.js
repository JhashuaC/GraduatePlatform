const CareerCourse = require('../models/career_course.model');

const assignCourseToCareer = async (req, res) => {
  const { id_career, id_course } = req.body;
  try {
    const entry = await CareerCourse.create({ id_career, id_course });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: 'Error al asignar curso a carrera' });
  }
};

const removeCourseFromCareer = async (req, res) => {
  const { id_career, id_course } = req.params;
  try {
    const deleted = await CareerCourse.destroy({
      where: { id_career, id_course },
    });
    if (!deleted) return res.status(404).json({ message: 'Asignación no encontrada' });
    res.json({ message: 'Asignación eliminada' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar asignación' });
  }
};

module.exports = {
  assignCourseToCareer,
  removeCourseFromCareer,
};
