
const express = require('express');
const router = express.Router();
const {
  assignCategoryToCourse,
  removeCategoryFromCourse,
} = require('../controllers/course_categories.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.post('/', verifyToken, assignCategoryToCourse);
router.delete('/:id_course/:id_option', verifyToken, removeCategoryFromCourse);

module.exports = router;
