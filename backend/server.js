import { createTransport } from 'nodemailer';
import pkg from 'body-parser';
import express from 'express';
import cors from "cors";
import { MongoClient, ListCollectionsCursor } from 'mongodb';
import {URI,DataBase,studentCollection} from './Admin/DataBase.js';
import { adminEmail,adminPassword } from './Admin/Email.js';
const {json} = pkg;
const app = express();
app.use(json());


const client = new MongoClient(URI);

client.connect();
const collection_users = client.db('College').collection('students');
const collection_users1 = client.db('current_users').collection('users');

const collection_courses = client.db("current_users").collection('courses')


// Create a transport object to configure the email server
const transport = createTransport({
    service:"gmail",
  auth: {
    user: adminEmail, // replace with your email server username
    pass: adminPassword // replace with your email server password
  }
});
app.use(cors());
var otp = ""
var userEmail = ""
app.post('/api/login',async  (req, res) => {
  console.log(req.body.data)
  userEmail = req.body.data.email;
   const data = await collection_users.find({email:userEmail}).project({}).toArray()
   console.log(data)
  if(data[0].email === userEmail){
    res.send({success: true})
    otp = String(Math.floor(Math.random()*1000 + 1000))
    let mailDetails = {
      from : adminEmail,
      to: userEmail,
      subject : "OTP",
      text: otp
    }
    transport.sendMail(mailDetails,(err,_data) => {
      if(err)
        {
          console.log("The following error occured while sending mail.")
          console.log(err.message)
        }
        else
        {
          console.log("Message sent successfully.")
        }
    })
  }
  // eslint-disable-next-line no-unused-expressions
  else{
    res.send({success: false})
  }
})
app.post('/api/otp',async  (req, res) => {
  console.log(req.body.data)
  const OTP = req.body.data.otp;
  //  const data = await collection_users.find({email:email}).project({}).toArray()
  //  console.log(data)
  if(OTP === otp){
    res.send({success: true})
  }
  // eslint-disable-next-line no-unused-expressions
  else{
    res.send({success: false})
  }
})

app.post('/api/courses',async (req, res) => {
  const data = await collection_courses.find({}).project({}).toArray();
  
  res.send({data:data});

})

app.post('/api/get_inst_name',async (req, res) => {
  const data = await collection_users1.find({email:req.body.data.email}).project({}).toArray();
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
