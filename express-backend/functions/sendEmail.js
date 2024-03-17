const nodemailer = require("nodemailer")
require('dotenv').config()


const sendEmail =  async (htmlBody, to_addr, subject) => { 
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_DFA,
    },
  })

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: to_addr, 
    subject: subject,
    html: htmlBody, 
  });
}

module.exports = sendEmail