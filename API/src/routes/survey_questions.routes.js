const express = require('express');
const router = express.Router();
const {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = require('../controllers/survey_questions.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.get('/', verifyToken, getAllQuestions);
router.get('/:id', verifyToken, getQuestionById);
router.post('/', verifyToken, createQuestion);
router.put('/:id', verifyToken, updateQuestion);
router.delete('/:id', verifyToken, deleteQuestion);

module.exports = router;
