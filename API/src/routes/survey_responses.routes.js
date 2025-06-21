const express = require('express');
const router = express.Router();
const controller = require('../controllers/survey_responses.controller');
const verifyToken = require('../middleware/auth.middleware');

router.get('/', verifyToken, controller.getAllSurveyResponses);
router.get('/:id_question/:id_graduate', verifyToken, controller.getSurveyResponse);
router.post('/', verifyToken, controller.createSurveyResponse);
router.put('/:id_question/:id_graduate', verifyToken, controller.updateSurveyResponse);
router.delete('/:id_question/:id_graduate', verifyToken, controller.deleteSurveyResponse);

module.exports = router;
