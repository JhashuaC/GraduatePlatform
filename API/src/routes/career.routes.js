const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const controller = require('../controllers/career.controller');


router.get('/', controller.getAllCareers);
router.get('/:id', authenticate, controller.getCareerById); 
router.post('/', authenticate, controller.createCareer); // Crear una nueva carrera (solo admin)
router.put('/:id', authenticate, controller.updateCareer); 
router.delete('/:id', authenticate,  controller.deleteCareer); // Eliminar una carrera (solo admin)

module.exports = router;
