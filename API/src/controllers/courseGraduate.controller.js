const { Course_Graduate, Course, Graduate } = require('../models');

const assignGraduateToCourse = async (req, res) => {
  try {
    const { course_id, graduate_id } = req.body;
    const assignment = await Course_Graduate.create({ course_id, graduate_id });
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: 'Error al asignar egresado al curso', error });
  }
};

const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Course_Graduate.findAll({
      include: [Course, Graduate]
    });
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener asignaciones', error });
  }
};

const getAssignment = async (req, res) => {
  try {
    const { course_id, graduate_id } = req.params;
    const assignment = await Course_Graduate.findOne({
      where: { course_id, graduate_id },
      include: [Course, Graduate]
    });
    if (!assignment) return res.status(404).json({ message: 'Asignación no encontrada' });
    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener asignación', error });
  }
};

const removeGraduateFromCourse = async (req, res) => {
  try {
    const { course_id, graduate_id } = req.params;
    const deleted = await Course_Graduate.destroy({
      where: { course_id, graduate_id }
    });
    if (!deleted) return res.status(404).json({ message: 'Asignación no encontrada' });
    res.status(200).json({ message: 'Egresado removido del curso exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar asignación', error });
  }
};

module.exports = {
  assignGraduateToCourse,
  getAllAssignments,
  getAssignment,
  removeGraduateFromCourse
};
