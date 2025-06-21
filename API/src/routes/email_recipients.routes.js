const express = require('express');
const router = express.Router();
const controller = require('../controllers/email_recipients.controller');
const verifyToken = require('../middleware/auth.middleware');

router.get('/', verifyToken, controller.getAllEmailRecipients);
router.get('/:id_historial/:id_graduate', verifyToken, controller.getEmailRecipient);
router.post('/', verifyToken, controller.assignRecipientToEmail);
router.delete('/:id_historial/:id_graduate', verifyToken, controller.removeRecipientFromEmail);

module.exports = router;
