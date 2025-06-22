const express = require('express');
const router = express.Router();
const controller = require('../controllers/career_course.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.get('/', verifyToken, controller.getAllCareerCourses);
router.get('/:id_career/:id_course', verifyToken, controller.getCareerCourse);
router.post('/', verifyToken, controller.assignCourseToCareer);
router.delete('/:id_career/:id_course', verifyToken, controller.removeCourseFromCareer);

module.exports = router;
