const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

function sendMail(options) {

    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE_NAME,
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_ID,
        to: options.to,
        subject: options.subject,
        html: options.body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            // console.log(info);
        }
    });
}

module.exports = {
    sendMail
};