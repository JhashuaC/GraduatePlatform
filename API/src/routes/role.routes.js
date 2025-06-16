const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const controller = require('../controllers/role.controller');

// Rutas de rol
router.get('/', authenticate, controller.getAllRoles); // Obtener todos los roles (solo admin)
router.get('/:id', authenticate, controller.getRoleById); // Obtener un rol por ID
router.post('/', authenticate, controller.createRole); // Crear un nuevo rol (solo admin)
router.put('/:id', authenticate, controller.updateRole); // Actualizar un rol (solo admin)
router.delete('/:id', authenticate, controller.deleteRole); // Eliminar un rol (solo admin)

module.exports = router;
