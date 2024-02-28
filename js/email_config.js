// sendgrid.config.js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('tu_api_key');
module.exports = sgMail;
