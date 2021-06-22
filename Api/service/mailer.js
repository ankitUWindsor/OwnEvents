const nodemailer = require('nodemailer');

const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_SENDER,
        pass: process.env.MAIL_SENDER_PASSWORD
    }
});

function sendMail(mail) {
    const mailOptions = {
        from: process.env.MAIL_SENDER,
        to: mail.to,
        subject: mail.subject,
        text: mail.text
    };

    return new Promise((resolve, reject) => {
        mailTransporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject(error);
            } else {
                resolve('Email sent: ' + info.response);
            }
        });
    })

}

module.exports = {sendMail};