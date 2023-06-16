const nodemailer = require('nodemailer');
const cfg = require('dotenv').config()

// Nodemailer
const sendEmail = async (options,res) => {
  // 1) Create transporter ( service that will send email like "gmail","Mailgun", "mialtrap", sendGrid)
  const transporter = nodemailer.createTransport({
    // host: process.env.EMAIL_HOST,
    // port: process.env.EMAIL_PORT, // if secure false port = 587, if true port= 465
    service:"gmail",
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    date:options.email
  });

  // 2) Define email options (like from, to, subject, email content)
  const mailOpts = {
    from: options.email,
    to: process.env.EMAIL_USER,
    subject: options.subject,
    text: options.message,
  };

  // 3) Send email
  const sendMessage = await transporter.sendMail(mailOpts);
  if(!sendMessage){
    res.status(403).send("An error occured");
  }else{
    res.status(200).send("Email sent");
  }
};

module.exports = sendEmail;
