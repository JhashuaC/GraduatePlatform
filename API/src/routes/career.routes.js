const express = require('express');
const router = express.Router();
const {
  getAllCareers,
  getCareerById,
  createCareer,
  updateCareer,
  deleteCareer,
} = require('../controllers/career.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.get('/', verifyToken, getAllCareers);
router.get('/:id', verifyToken, getCareerById);
router.post('/', verifyToken, createCareer);
router.put('/:id', verifyToken, updateCareer);
router.delete('/:id', verifyToken, deleteCareer);

module.exports = router;
