const express = require('express');
const router = express.Router();

const {
  assignGraduateToCourse,
  updateCompletionStatus,
  removeGraduateFromCourse,
} = require('../controllers/course_graduate.controller');

const { verifyToken } = require('../middleware/auth.middleware');

router.post('/', verifyToken, assignGraduateToCourse);
router.put('/:id_course/:id_graduate', verifyToken, updateCompletionStatus);
router.delete('/:id_course/:id_graduate', verifyToken, removeGraduateFromCourse);

module.exports = router;