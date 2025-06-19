// src/controllers/course_graduate.controller.js
const { CourseGraduate } = require('../models');

const assignGraduateToCourse = async (req, res) => {
  const { id_graduate, id_course } = req.body;
  const exists = await CourseGraduate.findOne({ where: { id_graduate, id_course } });
  if (exists) return res.status(400).json({ message: 'Ya asignado' });

  const result = await CourseGraduate.create({ id_graduate, id_course });
  res.status(201).json(result);
};

const updateCompletionStatus = async (req, res) => {
  const { id_course, id_graduate } = req.params;
  const { completado, fecha_completado } = req.body;

  const row = await CourseGraduate.findOne({ where: { id_course, id_graduate } });
  if (!row) return res.status(404).json({ message: 'No encontrado' });

  row.completado = completado;
  row.fecha_completado = fecha_completado;
  await row.save();

  res.json(row);
};

const removeGraduateFromCourse = async (req, res) => {
  const { id_course, id_graduate } = req.params;
  const deleted = await CourseGraduate.destroy({ where: { id_course, id_graduate } });
  if (!deleted) return res.status(404).json({ message: 'No encontrado' });

  res.json({ message: 'Eliminado correctamente' });
};

module.exports = {
  assignGraduateToCourse,
  updateCompletionStatus,
  removeGraduateFromCourse,
}