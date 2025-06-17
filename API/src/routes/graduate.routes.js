const express = require('express');
const router = express.Router();
const {
  getAllGraduates,
  getGraduateById,
  createGraduate,
  updateGraduate,
  deleteGraduate,
} = require('../controllers/graduate.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.get('/', verifyToken, getAllGraduates);
router.get('/:id', verifyToken, getGraduateById);
router.post('/', verifyToken, createGraduate);
router.put('/:id', verifyToken, updateGraduate);
router.delete('/:id', verifyToken, deleteGraduate);

module.exports = router;
