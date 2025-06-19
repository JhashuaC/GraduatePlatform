const CourseGraduate = require('../models/course_graduate.model');

const assignGraduateToCourse = async (req, res) => {
  const { id_course, id_graduate, completed, completed_at } = req.body;
  try {
    const assignment = await CourseGraduate.create({
      id_course,
      id_graduate,
      completed: completed || false,
      completed_at: completed_at || null,
    });
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ message: 'Error al asignar graduado al curso' });
  }
};

const updateCompletionStatus = async (req, res) => {
  const { id_course, id_graduate } = req.params;
  const { completed, completed_at } = req.body;
  try {
    const record = await CourseGraduate.findOne({ where: { id_course, id_graduate } });
    if (!record) return res.status(404).json({ message: 'Registro no encontrado' });

    await record.update({ completed, completed_at });
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar estado de finalización' });
  }
};

const removeGraduateFromCourse = async (req, res) => {
  const { id_course, id_graduate } = req.params;
  try {
    const deleted = await CourseGraduate.destroy({ where: { id_course, id_graduate } });
    if (!deleted) return res.status(404).json({ message: 'Relación no encontrada' });
    res.json({ message: 'Graduado removido del curso' });
  } catch (err) {
    res.status(500).json({ message: 'Error al remover graduado' });
  }
};

module.exports = {
  assignGraduateToCourse,
  updateCompletionStatus,
  removeGraduateFromCourse,
};
