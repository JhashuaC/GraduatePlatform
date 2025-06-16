const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const controller = require('../controllers/graduate.controller');


router.get('/', authenticate, controller.getAllGraduates); // Obtener todos los graduados
router.get('/:id', authenticate, controller.getGraduateById); // Obtener un graduado por ID
router.post('/', authenticate, authorize('admin'), controller.createGraduate); // Crear un nuevo graduado (solo admin)
router.put('/:id', authenticate, controller.updateGraduate); // Actualizar un graduado
router.delete('/:id', authenticate, authorize('admin'), controller.deleteGraduate); // Eliminar un graduado (solo admin)



module.exports = router;
