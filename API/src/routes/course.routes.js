const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const controller = require('../controllers/course.controller');

// Rutas de curso
router.get('/', authenticate, controller.getAllCourses); // Obtener todos los cursos
router.get('/:id', authenticate, controller.getCourseById); // Obtener un curso por ID
router.post('/', authenticate, authorize('admin'), controller.createCourse); // Crear un nuevo curso (solo admin)
router.put('/:id', authenticate, controller.updateCourse); // Actualizar un curso
router.delete('/:id', authenticate, authorize('admin'), controller.deleteCourse); // Eliminar un curso (solo admin)

module.exports = router;
