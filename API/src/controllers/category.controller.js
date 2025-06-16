const { Category } = require('../models');

const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear categoría', error });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener categorías', error });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener categoría', error });
  }
};

const updateCategory = async (req, res) => {
  try {
    const updated = await Category.update(req.body, { where: { id_category: req.params.id } });
    if (!updated[0]) return res.status(404).json({ message: 'Categoría no encontrada' });
    const updatedCategory = await Category.findByPk(req.params.id);
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar categoría', error });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.destroy({ where: { id_category: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.status(200).json({ message: 'Categoría eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar categoría', error });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};
