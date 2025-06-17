const EmailRecipient = require('../models/email_recipients.model');

const getRecipientsByEmail = async (req, res) => {
  try {
    const recipients = await EmailRecipient.findAll({
      where: { id_email: req.params.id_email },
    });
    res.json(recipients);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener destinatarios' });
  }
};

const addRecipient = async (req, res) => {
  const { id_email, id_graduate, email } = req.body;
  try {
    const entry = await EmailRecipient.create({ id_email, id_graduate, email });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: 'Error al agregar destinatario' });
  }
};

const removeRecipient = async (req, res) => {
  const { id_email, id_graduate } = req.params;
  try {
    const deleted = await EmailRecipient.destroy({ where: { id_email, id_graduate } });
    if (!deleted) return res.status(404).json({ message: 'Destinatario no encontrado' });
    res.json({ message: 'Destinatario eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar destinatario' });
  }
};

module.exports = {
  getRecipientsByEmail,
  addRecipient,
  removeRecipient,
};
