const EmailHistory = require('../models/email_history.model');
const User = require('../models/user.model');

const getAllEmails = async (req, res) => {
  try {
    const emails = await EmailHistory.findAll({ include: User });
    res.json(emails);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener historial de correos' });
  }
};

const getEmailById = async (req, res) => {
  try {
    const email = await EmailHistory.findByPk(req.params.id, { include: User });
    if (!email) return res.status(404).json({ message: 'Correo no encontrado' });
    res.json(email);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar correo' });
  }
};

const createEmail = async (req, res) => {
  const { id_admin, subject, message, sent_to, carrera_filtrada } = req.body;
  try {
    const email = await EmailHistory.create({
      id_admin,
      subject,
      message,
      sent_to,
      carrera_filtrada,
    });
    res.status(201).json(email);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear correo' });
  }
};

module.exports = {
  getAllEmails,
  getEmailById,
  createEmail,
};
