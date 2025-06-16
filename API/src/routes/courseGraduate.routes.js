const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const controller = require('../controllers/courseGraduate.controller');

// Rutas de curso-graduado
router.post('/', authenticate, authorize('admin'), controller.assignGraduateToCourse); // Asignar graduado a curso (solo admin)
router.get('/', authenticate, controller.getAllAssignments); // Obtener todas las asignaciones de graduados
router.get('/:course_id/:graduate_id', authenticate, controller.getAssignment); // Obtener asignación por ID de curso y graduado
router.delete('/:course_id/:graduate_id', authenticate, authorize('admin'), controller.removeGraduateFromCourse); // Eliminar asignación (solo admin)

module.exports = router;
