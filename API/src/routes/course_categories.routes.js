const express = require('express');
const router = express.Router();
const controller = require('../controllers/course_categories.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.get('/', verifyToken, controller.getAllCourseCategories);
router.get('/:id_course/:id_option', verifyToken, controller.getCourseCategory);
router.post('/', verifyToken, controller.assignCategoryToCourse);
router.delete('/:id_course/:id_option', verifyToken, controller.removeCategoryFromCourse);

module.exports = router;
