const express = require('express');
const router = express.Router();
const {
  assignPreferenceToGraduate,
  removePreferenceFromGraduate,
} = require('../controllers/graduate_preferences.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.post('/', verifyToken, assignPreferenceToGraduate);
router.delete('/:id_graduate/:id_option', verifyToken, removePreferenceFromGraduate);

module.exports = router;
