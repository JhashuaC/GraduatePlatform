const express = require('express');
const router = express.Router();
const {
  getAllResponses,
  getResponsesByGraduate,
  submitResponse,
} = require('../controllers/survey_responses.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.get('/', verifyToken, getAllResponses);
router.get('/graduate/:id_graduate', verifyToken, getResponsesByGraduate);
router.post('/', verifyToken, submitResponse);

module.exports = router;
