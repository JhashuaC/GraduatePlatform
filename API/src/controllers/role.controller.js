const { Role } = require('../models');

const createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const role = await Role.create({ name });
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear rol', error });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener roles', error });
  }
};

const getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ message: 'Rol no encontrado' });
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener rol', error });
  }
};

const updateRole = async (req, res) => {
  try {
    const { name } = req.body;
    const updated = await Role.update({ name }, { where: { id_role: req.params.id } });
    if (!updated[0]) return res.status(404).json({ message: 'Rol no encontrado' });
    const updatedRole = await Role.findByPk(req.params.id);
    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar rol', error });
  }
};

const deleteRole = async (req, res) => {
  try {
    const deleted = await Role.destroy({ where: { id_role: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Rol no encontrado' });
    res.status(200).json({ message: 'Rol eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar rol', error });
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole
};
