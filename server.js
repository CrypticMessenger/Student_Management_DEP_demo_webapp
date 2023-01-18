const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const express = require('express');
const  cors = require("cors");
const app = express();
app.use(bodyParser.json());
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://user:so2QY5f6GdxnLoXJ@cluster0.6uvcoow.mongodb.net/test"
const client = new MongoClient(uri);
client.connect();
const collection = client.db("test").collection('otp');
const collection_users = client.db("current_users").collection('users');
const collection_courses = client.db("current_users").collection('courses')


// Create a transport object to configure the email server
const transport = nodemailer.createTransport({
    service:"gmail",
  auth: {
    user: 'ankit13112002.sharma@gmail.com', // replace with your email server username
    pass: 'ycdraixktookzsem' // replace with your email server password
  }
});
app.use(cors());


app.post('/api/login',async  (req, res) => {
  const email = req.body.data.email;
  const password = req.body.data.password;
   const data = await collection_users.find({email:email}).project({}).toArray()
  //  console.log(data)
  if(data[0].email === email && data[0].password === password){
    res.send({success: true})
  }
  else[
    res.send({success: false})
  ]

})

app.post('/api/courses',async (req, res) => {
  const data = await collection_courses.find({}).project({}).toArray();
  
  res.send({data:data});

})

app.post('/api/get_inst_name',async (req, res) => {
  const data = await collection_users.find({email:req.body.data.email}).project({}).toArray();
  res.send({name:data[0].name});
})


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

// Create the email object to send
// const mailOptions = {
//   from: 'ankit13112002.sharma@gmail.com', // replace with the sender's email address
//   to: '2020csb1070@iitrpr.ac.in', // replace with the recipient's email address
//   subject: 'Hello World', // replace with the email subject
//   text: 'This is a test email sent from JavaScript.' // replace with the email body
// };

// Send the email
// transport.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(`Email sent: ${info.response}`);
//   }
// });
