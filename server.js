const nodemailer = require('nodemailer');

// Create a transport object to configure the email server
const transport = nodemailer.createTransport({
    service:"gmail",
//   host: 'smtp.gmail.com', // replace with your email server host
//   port: 587, // replace with your email server port
  auth: {
    user: 'ankit13112002.sharma@gmail.com', // replace with your email server username
    pass: 'ycdraixktookzsem' // replace with your email server password
  }
});

// Create the email object to send
const mailOptions = {
  from: 'ankit13112002.sharma@gmail.com', // replace with the sender's email address
  to: 'ankitsharma61016@gmail.com', // replace with the recipient's email address
  subject: 'Hello World', // replace with the email subject
  text: 'This is a test email sent from JavaScript.' // replace with the email body
};

// Send the email
transport.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Email sent: ${info.response}`);
  }
});
