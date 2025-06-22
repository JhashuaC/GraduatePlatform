const express = require('express');
const router = express.Router();
const { sendGradeEmail } = require('../controllers/notes.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.post('/send', verifyToken, sendGradeEmail);


module.exports = router;
