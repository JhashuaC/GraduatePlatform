const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { User } = require('../models'); 
require('dotenv').config();

const verifyToken = promisify(jwt.verify);


const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
  
    const decoded = await verifyToken(token, process.env.JWT_SECRET);

   
    const user = await User.findByPk(decoded.id_user);

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }


    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

/**
 * Middleware para verificar si el usuario tiene un rol específico
 * @param {string[]} roles - Lista de roles permitidos
 */
const authorize = (...roles) => {
  return (req, res, next) => {

    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Acceso denegado: permisos insuficientes' });
    }
    next();
  };
};

module.exports = {
  authenticate,
  authorize
};
