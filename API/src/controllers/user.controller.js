const User = require('../models/user.model');
const Role = require('../models/roles.model');
const bcrypt = require('bcrypt');

const getAllUsers = async(req, res) => {
    try {
        const users = await User.findAll({ include: Role });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
};

const getUserById = async(req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id, { include: Role });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error al buscar usuario' });
    }
};

const createUser = async(req, res) => {
    const {
        first_name,
        last_name1,
        last_name2,
        identity_number,
        email,
        phone,
        address,
        password,
        id_role,
    } = req.body;

    console.log('[CREATE USER] Solicitud recibida con los siguientes datos:');
    console.log({
        first_name,
        last_name1,
        last_name2,
        identity_number,
        email,
        phone,
        address,
        id_role,
    });

    try {
        console.log('[CREATE USER] Generando hash para la contraseña...');
        const hash = await bcrypt.hash(password, 10);
        console.log('[CREATE USER] Hash generado con éxito.');

        console.log('[CREATE USER] Creando nuevo usuario en la base de datos...');
        const user = await User.create({
            first_name,
            last_name1,
            last_name2,
            identity_number,
            email,
            phone,
            address,
            password: hash,
            id_role,
        });


        console.log('[CREATE USER] Usuario creado exitosamente:', user.toJSON());
        res.status(201).json(user);
    } catch (err) {
        console.error('[CREATE USER] Error al crear usuario:', err);
        res.status(500).json({ message: 'Error al crear usuario' });
    }
};


const updateUser = async(req, res) => {
    const { id } = req.params;
    const { first_name, last_name1, last_name2, identity_number, email, phone, address, password, id_role } = req.body;
    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        let updatedPassword = user.password;
        if (password) {
            updatedPassword = await bcrypt.hash(password, 10);
        }

        await user.update({
            first_name,
            last_name1,
            last_name2,
            identity_number,
            email,
            phone,
            address,
            password: updatedPassword,
            id_role,
        });

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar usuario' });
    }
};

const deleteUser = async(req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        await user.destroy();
        res.json({ message: 'Usuario eliminado' });
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar usuario' });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};