const express = require('express');
const router = express.Router();
const {
  getAllEmails,
  getEmailById,
  createEmail,
} = require('../controllers/email_history.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.get('/', verifyToken, getAllEmails);
router.get('/:id', verifyToken, getEmailById);
router.post('/', verifyToken, createEmail);

module.exports = router;
