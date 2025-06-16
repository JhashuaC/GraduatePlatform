const { User, Role } = require('../models');
const { JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Asegúrate de tener esto importado

const createUser = async (req, res) => {
  try {
    const { name, email, password, id_role } = req.body;
    const user = await User.create({ name, email, password, id_role });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear usuario', error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: Role });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { include: Role });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario', error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, password, id_role } = req.body;
    const updated = await User.update({ name, password, id_role }, { where: { id_user: req.params.id } });
    if (!updated[0]) return res.status(404).json({ message: 'Usuario no encontrado' });
    const updatedUser = await User.findByPk(req.params.id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar usuario', error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id_user: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: Role
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id_user: user.id_user }, // El rol será cargado por el middleware
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el login', error });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  login
};
