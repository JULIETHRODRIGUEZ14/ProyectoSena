const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

// Base de datos simulada para almacenar tokens y correos electrónicos de recuperación de contraseña
const recoveryTokens = {};

// Configurar nodemailer con las credenciales del servicio de correo electrónico
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tu_correo@gmail.com',
        pass: 'tu_contraseña'
    }
});

// Ruta para manejar la solicitud de recuperación de contraseña
app.post('/forgot-password', (req, res) => {
    const email = req.body.email;

    // Generar un token único
    const token = crypto.randomBytes(20).toString('hex');

    // Almacenar el token en la base de datos simulada
    recoveryTokens[token] = email;

    // Enviar correo electrónico de recuperación de contraseña
    const mailOptions = {
        from: 'tu_correo@gmail.com',
        to: email,
        subject: 'Recuperación de Contraseña',
        text: `Haz clic en el siguiente enlace para restablecer tu contraseña: http://tuapp.com/reset-password?token=${token}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo electrónico:', error);
            res.status(500).send('Error al enviar el correo electrónico de recuperación de contraseña.');
        } else {
            console.log('Correo electrónico de recuperación de contraseña enviado:', info.response);
            res.status(200).send('Correo electrónico de recuperación de contraseña enviado.');
        }
    });
});

// Ruta para manejar el restablecimiento de contraseña
app.post('/reset-password', (req, res) => {
    const token = req.body.token;
    const newPassword = req.body.newPassword;

    // Verificar si el token es válido
    const email = recoveryTokens[token];
    if (!email) {
        return res.status(400).send('Token de recuperación de contraseña no válido.');
    }

    // Actualizar la contraseña en la base de datos (simulado)
    // Aquí iría la lógica para actualizar la contraseña en tu base de datos

    // Eliminar el token de la base de datos después de usarlo
    delete recoveryTokens[token];

    // Enviar una respuesta exitosa
    res.status(200).send('Contraseña restablecida con éxito.');
});

module.exports = app;
