const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const controller = require('../controllers/courseSpeaker.controller');

// Rutas de curso-ponente
router.post('/', authenticate, authorize('admin'), controller.assignSpeakerToCourse); // Asignar ponente a curso (solo admin)
router.get('/', authenticate, controller.getAllAssignments); // Obtener todas las asignaciones de ponentes
router.get('/:course_id/:speaker_id', authenticate, controller.getAssignment); // Obtener asignación por ID de curso y ponente
router.delete('/:course_id/:speaker_id', authenticate, authorize('admin'), controller.removeSpeakerFromCourse); // Eliminar asignación (solo admin)

module.exports = router;
