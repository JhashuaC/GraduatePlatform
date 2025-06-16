const { Course_Speaker, Course, Speaker } = require('../models');

const assignSpeakerToCourse = async (req, res) => {
  try {
    const { speaker_id, course_id } = req.body;
    const assignment = await Course_Speaker.create({ speaker_id, course_id });
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: 'Error al asignar ponente al curso', error });
  }
};

const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Course_Speaker.findAll({
      include: [Course, Speaker]
    });
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener asignaciones', error });
  }
};

const getAssignment = async (req, res) => {
  try {
    const { course_id, speaker_id } = req.params;
    const assignment = await Course_Speaker.findOne({
      where: { course_id, speaker_id },
      include: [Course, Speaker]
    });
    if (!assignment) return res.status(404).json({ message: 'Asignación no encontrada' });
    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener asignación', error });
  }
};

const removeSpeakerFromCourse = async (req, res) => {
  try {
    const { speaker_id, course_id } = req.params;
    const deleted = await Course_Speaker.destroy({
      where: { speaker_id, course_id }
    });
    if (!deleted) return res.status(404).json({ message: 'Asignación no encontrada' });
    res.status(200).json({ message: 'Ponente removido del curso exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar asignación', error });
  }
};

module.exports = {
  assignSpeakerToCourse,
  getAllAssignments,
  getAssignment,
  removeSpeakerFromCourse
};
