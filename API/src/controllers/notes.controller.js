const { User } = require('../models');
const { sendNoteEmail } = require('../utils/emailSender');

const sendGradeEmail = async (req, res) => {
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

        const subject = 'RESULTADO DEL TALLER - ' + course_name.toUpperCase()
        const text = `
Estimado/a ${graduate.first_name} ${graduate.last_name1},

Espero que este mensaje le encuentre bien. 

Me complace informarle que ha finalizado el proceso de evaluación del taller "${course_name}". Su calificación obtenida es: ${note}.

Detalles adicionales:
- Taller: ${course_name}
- Calificación: ${note}
- Certificado: Disponible en su historial académico

**Importante sobre su certificado:**
El certificado digital de este taller ya se encuentra disponible para su descarga en la sección de Historial Académico de su perfil. Puede acceder a él en cualquier momento cuando lo necesite.

Si desea:
• Revisar aspectos específicos de su evaluación
• Recibir retroalimentación detallada
• Realizar cualquier consulta relacionada

Puede contactarnos directamente a través del número telefónico del Taller o respondiendo a este correo.

Quedo a su disposición para cualquier inquietud.

Cordialmente,
Coordinación del Taller ${course_name}`;
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