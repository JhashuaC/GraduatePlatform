const CourseCategory = require('../models/course_categories.model');

const assignCategoryToCourse = async (req, res) => {
  const { id_course, id_option } = req.body;
  try {
    const entry = await CourseCategory.create({ id_course, id_option });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: 'Error al asignar categoría al curso' });
  }
};

const removeCategoryFromCourse = async (req, res) => {
  const { id_course, id_option } = req.params;
  try {
    const deleted = await CourseCategory.destroy({ where: { id_course, id_option } });
    if (!deleted) return res.status(404).json({ message: 'Relación no encontrada' });
    res.json({ message: 'Categoría removida del curso' });
  } catch (err) {
    res.status(500).json({ message: 'Error al remover categoría' });
  }
};

module.exports = {
  assignCategoryToCourse,
  removeCategoryFromCourse,
};
