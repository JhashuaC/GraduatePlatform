const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const Role = require('../models/roles.model');

const login = async (req, res) => {
 
  const { email, password } = req.body;

  try {
   
    const user = await User.findOne({ where: { email } });
   
    if (!user) {
      
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }


    const role = await Role.findOne({ where: { id_role: user.id_role } });
   
    if (!role) {
     
      return res.status(404).json({ message: 'Rol no encontrado' });
    }

  
    // const valid = await bcrypt.compare(password, user.password);
    const valid = password === user.password; // reemplazar por bcrypt si lo usas

   
    if (!valid) {
     
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

  
    const tokenPayload = {
      id_user: user.id_user,
      email: user.email,
      role: role.name,
    };

    
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET || 'secret_key', {
      expiresIn: '4h',
    });



    res.json({
      token,
      User: user,
      Role: role.name,
    });
  } catch (error) {
   res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = { login };
