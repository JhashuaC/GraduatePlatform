const express = require('express');
const router = express.Router();
const {
  getRecipientsByEmail,
  addRecipient,
  removeRecipient,
} = require('../controllers/email_recipients.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.get('/:id_email', verifyToken, getRecipientsByEmail);
router.post('/', verifyToken, addRecipient);
router.delete('/:id_email/:id_graduate', verifyToken, removeRecipient);

module.exports = router;
