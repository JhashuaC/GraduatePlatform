const { User } = require('../models');
const { sendNoteEmail } = require('../utils/emailSender');

const sendGradeEmail = async(req, res) => {
    const { id, note, course_name } = req.body;

    console.log('Iniciando envío de nota por correo');
    console.log('ID recibido:', id);
    console.log('Nota recibida:', note);

    try {
        const graduate = await User.findByPk(id);
        if (!graduate) {
            console.log('Graduado no encontrado con ID:', id);
            return res.status(404).json({ message: 'Graduado no encontrado' });
        }

        const subject = 'Resultado de taller';
        const text = `Hola ${graduate.first_name}, tu nota en el taller ${course_name}, ha sido: ${note}.`;

        console.log('Enviando correo a:', graduate.email);
        console.log('Asunto:', subject);
        console.log('Contenido:', text);

        await sendNoteEmail(graduate.email, subject, text);

        console.log('Correo enviado con éxito');
        res.json({ message: 'Correo enviado correctamente' });
    } catch (err) {
        console.log('Error al enviar correo:', err);
        res.status(500).json({ message: 'Error al enviar correo' });
    }
};

module.exports = { sendGradeEmail };