const express = require('express');
const router = express.Router();
const controller = require('../controllers/graduate_preferences.controller');
const verifyToken = require('../middleware/auth.middleware');

router.get('/', verifyToken, controller.getAllGraduatePreferences);
router.get('/:id_graduate/:id_option', verifyToken, controller.getGraduatePreference);
router.post('/', verifyToken, controller.assignPreferenceToGraduate);
router.delete('/:id_graduate/:id_option', verifyToken, controller.removePreferenceFromGraduate);

module.exports = router;
