const { CourseCategory, Course, PreferenceOption } = require('../models');

const getAllCourseCategories = async (req, res) => {
  try {
    const data = await CourseCategory.findAll({
      include: [Course, PreferenceOption],
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener categorías de cursos' });
  }
};

const getCourseCategory = async (req, res) => {
  const { id_course, id_option } = req.params;
  try {
    const data = await CourseCategory.findOne({
      where: { id_course, id_option },
      include: [Course, PreferenceOption],
    });
    if (!data) return res.status(404).json({ message: 'Relación no encontrada' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar relación' });
  }
};

const assignCategoryToCourse = async (req, res) => {
  const { id_course, id_option } = req.body;
  try {
    const created = await CourseCategory.create({ id_course, id_option });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: 'Error al asignar categoría' });
  }
};

const removeCategoryFromCourse = async (req, res) => {
  const { id_course, id_option } = req.params;
  try {
    const deleted = await CourseCategory.destroy({ where: { id_course, id_option } });
    if (!deleted) return res.status(404).json({ message: 'Relación no encontrada' });
    res.json({ message: 'Categoría removida del curso' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar relación' });
  }
};

module.exports = {
  getAllCourseCategories,
  getCourseCategory,
  assignCategoryToCourse,
  removeCategoryFromCourse,
};
