// Importar el módulo nodemailer
const nodemailer = require('nodemailer');

// Configurar el transporte de nodemailer para usar Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tucorreo@gmail.com',
        pass: 'tucontraseña'
    }
});

// Función para enviar un correo electrónico de recuperación de contraseña
function enviarCorreoRecuperacion(destinatario, token) {
    // Configurar el mensaje de correo electrónico
    const mailOptions = {
        from: 'tucorreo@gmail.com',
        to: destinatario,
        subject: 'Recuperación de Contraseña',
        text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: http://tudominio.com/reset/${token}`
    };

    // Enviar el correo electrónico
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.error('Error al enviar el correo electrónico:', error);
        } else {
            console.log('Correo electrónico enviado:', info.response);
        }
    });
}

// Usar la función para enviar un correo de recuperación de contraseña
enviarCorreoRecuperacion('correo@usuario.com', 'token_de_recuperacion');
