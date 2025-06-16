const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

exports.generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

exports.sendVerificationCode = async (toEmail, code) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // o el servicio que uses
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"P4 Auth" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Código de verificación',
    text: `Tu código de verificación es: ${code}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Código enviado a ${toEmail}`);
  } catch (err) {
    console.error('Error enviando el correo:', err);
    throw new Error('No se pudo enviar el código de verificación');
  }
};
