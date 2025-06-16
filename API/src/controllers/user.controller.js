const { User, Role } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  try {
    const { name, last_name, email, password, id_role } = req.body;
    const user = await User.create({ name, last_name, email, password, id_role });
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

    // Traer explícitamente password
    const user = await User.findOne({
      where: { email },
      attributes: ['id_user', 'name', 'email', 'password', 'id_role']
    });

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Comparar
    //const match = await bcrypt.compare(password, user.password);
    //if (!match) return res.status(400).json({ message: 'Contraseña incorrecta' });

    if (user.password !== password) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const payload = { id_user: user.id_user, role: user.id_role };

    const token = jwt.sign(payload, "NOSIRVEEE", { expiresIn: '1h' });         //NO SIRVEEEEEEE

    // Excluir password del usuario que enviarás al frontend
    const { password: _pw, ...safeUser } = user.toJSON();
    console.log("SECRET:", process.env.JWT_SECRET);
    res.status(200).json({ token, user: safeUser });
  } catch (error) {
    console.error('ERROR EN LOGIN:', error);
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

