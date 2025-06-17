const express = require('express');
const router = express.Router();
const {
  assignCourseToCareer,
  removeCourseFromCareer,
} = require('../controllers/career_course.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.post('/', verifyToken, assignCourseToCareer);
router.delete('/:id_career/:id_course', verifyToken, removeCourseFromCareer);

module.exports = router;
