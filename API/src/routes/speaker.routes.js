const express = require('express');
const router = express.Router();
const {
    getAllSpeakers,
    getSpeakerById,
    createSpeaker,
    updateSpeaker,
    deleteSpeaker,
} = require('../controllers/speaker.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.get('/', verifyToken, getAllSpeakers);
router.get('/:id', verifyToken, getSpeakerById);
router.post('/', createSpeaker);
router.put('/:id', verifyToken, updateSpeaker);
router.delete('/:id', verifyToken, deleteSpeaker);

module.exports = router;