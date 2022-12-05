const nodemailer = require("nodemailer");

module.exports.Mailer = async({ to, subject, html }) => {
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    return transporter.sendMail({ from: process.env.SMTP_FROM, to, subject, html });
}