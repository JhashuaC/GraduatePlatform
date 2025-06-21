const { EmailRecipient, EmailHistory, Graduate } = require('../models');

const getAllEmailRecipients = async (req, res) => {
  try {
    const data = await EmailRecipient.findAll({
      include: [EmailHistory, Graduate],
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener destinatarios de correos' });
  }
};

const getEmailRecipient = async (req, res) => {
  const { id_historial, id_graduate } = req.params;
  try {
    const data = await EmailRecipient.findOne({
      where: { id_historial, id_graduate },
      include: [EmailHistory, Graduate],
    });
    if (!data) return res.status(404).json({ message: 'Relación no encontrada' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar relación' });
  }
};

const assignRecipientToEmail = async (req, res) => {
  const { id_historial, id_graduate } = req.body;
  try {
    const created = await EmailRecipient.create({ id_historial, id_graduate });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: 'Error al asignar destinatario' });
  }
};

const removeRecipientFromEmail = async (req, res) => {
  const { id_historial, id_graduate } = req.params;
  try {
    const deleted = await EmailRecipient.destroy({ where: { id_historial, id_graduate } });
    if (!deleted) return res.status(404).json({ message: 'Relación no encontrada' });
    res.json({ message: 'Destinatario removido del historial' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar relación' });
  }
};

module.exports = {
  getAllEmailRecipients,
  getEmailRecipient,
  assignRecipientToEmail,
  removeRecipientFromEmail,
};
