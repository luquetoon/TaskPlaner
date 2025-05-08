const nodemailer = require('nodemailer');
const config = require('../config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.emailUser,
    pass: config.emailPass,
  },
});

const sendWelcomeEmail = (to, name) => {
  const mailOptions = {
    from: config.emailUser,
    to,
    subject: 'Welcome to TaskPlanner',
    text: `Hello ${name}, welcome to TaskPlanner!`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = { sendWelcomeEmail };
