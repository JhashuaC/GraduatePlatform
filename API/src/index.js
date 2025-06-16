// Cargar las variables de entorno
require('dotenv').config();

// Importar dependencias
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


const db = require('./config/db');

// Importar rutas
const userRoutes = require('./routes/user.routes');
const roleRoutes = require('./routes/role.routes');
const graduateRoutes = require('./routes/graduate.routes');
const careerRoutes = require('./routes/career.routes');
const categoryRoutes = require('./routes/category.routes');
const courseRoutes = require('./routes/course.routes');
const speakerRoutes = require('./routes/speaker.routes');
const courseGraduateRoutes = require('./routes/courseGraduate.routes');
const courseSpeakerRoutes = require('./routes/courseSpeaker.routes');


const app = express();

// Middleware
app.use(cors()); // Permitir solicitudes CORS
app.use(morgan('dev')); // Registrar las solicitudes HTTP (modo desarrollo)
app.use(express.json()); // Parsear cuerpos de las solicitudes en formato JSON


app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/graduates', graduateRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/speakers', speakerRoutes);
app.use('/api/course_graduates', courseGraduateRoutes);
app.use('/api/course_speakers', courseSpeakerRoutes);

// Manejo de errores para rutas no encontradas
app.use((req, res, next) => {
  const error = new Error('Ruta no encontrada');
  error.status = 404;
  next(error);
});


app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Error interno del servidor';
  res.status(status).json({ message });
});


db.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida con éxito.');
  })
  .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err);
  });


const PORT = process.env.PORT || 3000;

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
