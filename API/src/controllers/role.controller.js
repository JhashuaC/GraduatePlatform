const Role = require('../models/roles.model');

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener roles' });
  }
};

const getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ message: 'Rol no encontrado' });
    res.json(role);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar rol' });
  }
};

const createRole = async (req, res) => {
  try {
    const role = await Role.create({ name: req.body.name });
    res.status(201).json(role);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear rol' });
  }
};

const updateRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ message: 'Rol no encontrado' });
    await role.update({ name: req.body.name });
    res.json(role);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar rol' });
  }
};

const deleteRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ message: 'Rol no encontrado' });
    await role.destroy();
    res.json({ message: 'Rol eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar rol' });
  }
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
