const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'authenticationemailp4@gmail.com',
    pass: 'stij vfrf hvdz iwxb',
  },
});

const sendNoteEmail = async (to, subject, text) => {
  await transporter.sendMail({
    from: '"Sistema de Talleres" <authenticationemailp4@gmail.com>',
    to,
    subject,
    text,
  });
};

module.exports = { sendNoteEmail };
