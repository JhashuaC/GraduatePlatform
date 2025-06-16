const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
     
  "p4_project",     //nombre de la base de datos
  "root", //usuario
  "1234", //contraseña 
  {
    host: process.env.DB_HOST, 
    dialect: 'mysql',         
    logging: false,           
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida con éxito.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

module.exports = sequelize;
