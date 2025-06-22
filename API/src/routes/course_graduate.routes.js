const express = require('express');
const router = express.Router();
const controller = require('../controllers/course_graduate.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.get('/', verifyToken, controller.getAllCourseGraduates);
router.get('/:id_course/:id_graduate', verifyToken, controller.getCourseGraduate);
router.get('/:id_graduate', verifyToken, controller.getAllCourseGraduatesById);
router.post('/', verifyToken, controller.assignGraduateToCourse);
router.put('/:id_course/:id_graduate', verifyToken, controller.updateCompletionStatus);
router.delete('/:id_course/:id_graduate', verifyToken, controller.removeGraduateFromCourse);

module.exports = router;
