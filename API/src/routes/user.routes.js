const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
// Rutas de usuario
router.post('/login', controller.login); // Iniciar sesión
//router.post('/register', controller.register); // Registrar un nuevo usuario
router.get('/', authenticate, authorize('admin'), controller.getAllUsers); // Obtener todos los usuarios (solo admin)
router.get('/:id', authenticate, controller.getUserById); // Obtener un usuario por ID
router.put('/:id', authenticate, controller.updateUser); // Actualizar un usuario
router.delete('/:id', authenticate, authorize('admin'), controller.deleteUser); // Eliminar un usuario (solo admin)

module.exports = router;
