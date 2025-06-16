const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const controller = require('../controllers/category.controller');

// Rutas de categoría
router.get('/', authenticate, controller.getAllCategories); // Obtener todas las categorías
router.get('/:id', authenticate, controller.getCategoryById); // Obtener una categoría por ID
router.post('/', authenticate, authorize('admin'), controller.createCategory); // Crear una nueva categoría (solo admin)
router.put('/:id', authenticate, controller.updateCategory); // Actualizar una categoría
router.delete('/:id', authenticate, authorize('admin'), controller.deleteCategory); // Eliminar una categoría (solo admin)

module.exports = router;
