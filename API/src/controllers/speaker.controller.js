const Speaker = require('../models/speaker.model');
const User = require('../models/user.model');

const getAllSpeakers = async(req, res) => {
    try {
        const speakers = await Speaker.findAll({ include: User });
        res.json(speakers);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener facilitadores' });
    }
};

const getSpeakerById = async(req, res) => {
    try {
        const speaker = await Speaker.findByPk(req.params.id, { include: User });
        if (!speaker) return res.status(404).json({ message: 'Facilitador no encontrado' });
        res.json(speaker);
    } catch (err) {
        res.status(500).json({ message: 'Error al buscar facilitador' });
    }
};

const createSpeaker = async(req, res) => {
    const { id_speaker, specialty, work_phone } = req.body;
    console.log('[CREATE SPEAKER] Solicitud recibida con datos:', {
        id_speaker,
        specialty,
        work_phone,
    });

    try {
        const speaker = await Speaker.create({ id_speaker, specialty, work_phone });

        console.log('[CREATE SPEAKER] Facilitador creado exitosamente:', speaker.toJSON());
        res.status(201).json(speaker);
    } catch (err) {
        console.error('[CREATE SPEAKER] Error al crear facilitador:', err);
        res.status(500).json({ message: 'Error al crear facilitador' });
    }
};


const updateSpeaker = async(req, res) => {
    try {
        const speaker = await Speaker.findByPk(req.params.id);
        if (!speaker) return res.status(404).json({ message: 'Facilitador no encontrado' });

        const { specialty, work_phone } = req.body;
        await speaker.update({ specialty, work_phone });

        res.json(speaker);
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar facilitador' });
    }
};

const deleteSpeaker = async(req, res) => {
    console.log(`[DELETE SPEAKER] Solicitud recibida para eliminar facilitador con ID: ${req.params.id}`);

    try {
        const speaker = await Speaker.findByPk(req.params.id);

        if (!speaker) {
            console.warn(`[DELETE SPEAKER] Facilitador con ID ${req.params.id} no encontrado`);
            return res.status(404).json({ message: 'Facilitador no encontrado' });
        }

        console.log(`[DELETE SPEAKER] Facilitador encontrado: ${speaker.name || 'sin nombre'}, eliminando...`);

        await speaker.destroy();

        console.log(`[DELETE SPEAKER] Facilitador con ID ${req.params.id} eliminado exitosamente`);
        res.json({ message: 'Facilitador eliminado' });
    } catch (err) {
        console.error(`[DELETE SPEAKER] Error al eliminar facilitador con ID ${req.params.id}:`, err);
        res.status(500).json({ message: 'Error al eliminar facilitador' });
    }
};


module.exports = {
    getAllSpeakers,
    getSpeakerById,
    createSpeaker,
    updateSpeaker,
    deleteSpeaker,
};