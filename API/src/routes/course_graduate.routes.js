const express = require('express');
const router = express.Router();
const {
  getAllPreferences,
  getPreferenceById,
  createPreference,
  updatePreference,
  deletePreference,
} = require('../controllers/preference_options.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.get('/', verifyToken, getAllPreferences);
router.get('/:id', verifyToken, getPreferenceById);
router.post('/', verifyToken, createPreference);
router.put('/:id', verifyToken, updatePreference);
router.delete('/:id', verifyToken, deletePreference);

module.exports = router;
