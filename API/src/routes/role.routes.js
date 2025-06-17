const express = require('express');
const router = express.Router();
const {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} = require('../controllers/role.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.get('/', verifyToken, getAllRoles);
router.get('/:id', verifyToken, getRoleById);
router.post('/', verifyToken, createRole);
router.put('/:id', verifyToken, updateRole);
router.delete('/:id', verifyToken, deleteRole);

module.exports = router;
