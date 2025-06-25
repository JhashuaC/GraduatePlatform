require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./config/database');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const roleRoutes = require('./routes/role.routes');
const careerRoutes = require('./routes/career.routes');
const graduateRoutes = require('./routes/graduate.routes');
const speakerRoutes = require('./routes/speaker.routes');
const courseRoutes = require('./routes/course.routes');
const careerCourseRoutes = require('./routes/career_courses.routes');
const courseGraduateRoutes = require('./routes/course_graduate.routes');
const preferenceOptionsRoutes = require('./routes/preference_options.routes');
const courseCategoriesRoutes = require('./routes/course_categories.routes');
const graduatePreferencesRoutes = require('./routes/graduate_preferences.routes');
const emailHistoryRoutes = require('./routes/email_history.routes');
const emailRecipientsRoutes = require('./routes/email_recipients.routes');
const surveyQuestionsRoutes = require('./routes/survey_questions.routes');
const surveyResponsesRoutes = require('./routes/survey_responses.routes');
const notesRoutes = require('./routes/notes.routes');
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/graduates', graduateRoutes);
app.use('/api/speakers', speakerRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/assign-career', careerCourseRoutes);
app.use('/api/assignments', courseGraduateRoutes);
app.use('/api/preferences', preferenceOptionsRoutes);
app.use('/api/course-categories', courseCategoriesRoutes);
app.use('/api/graduate-preferences', graduatePreferencesRoutes);
app.use('/api/emails', emailHistoryRoutes);
app.use('/api/recipients', emailRecipientsRoutes);
app.use('/api/questions', surveyQuestionsRoutes);
app.use('/api/responses', surveyResponsesRoutes);
app.use('/api/notes', notesRoutes)
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

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});