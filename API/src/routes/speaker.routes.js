const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const controller = require('../controllers/speaker.controller');

// Rutas de ponente
router.get('/', authenticate, controller.getAllSpeakers); // Obtener todos los ponentes
router.get('/:id', authenticate, controller.getSpeakerById); // Obtener un ponente por ID
router.post('/', authenticate, authorize('admin'), controller.createSpeaker); // Crear un nuevo ponente (solo admin)
router.put('/:id', authenticate, controller.updateSpeaker); // Actualizar un ponente
router.delete('/:id', authenticate, authorize('admin'), controller.deleteSpeaker); // Eliminar un ponente (solo admin)

module.exports = router;
