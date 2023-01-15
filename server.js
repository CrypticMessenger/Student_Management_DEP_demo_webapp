const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const express = require('express');
const  cors = require("cors");
const app = express();
app.use(bodyParser.json());
const {MongoClient, ListCollectionsCursor} = require('mongodb');
const uri = "mongodb+srv://ankitsharma61016:anil1972@otp-auth.wdondav.mongodb.net/test"
const client = new MongoClient(uri);
client.connect();
const collection = client.db("test").collection('otp');
// collection.insertOne({'email':'ankitsharma61016@gmail.com','otp':1234});
// collection.findOne({'email':'ankitsharma61016@gmail.com'},(err,data)=>{
//   if(err){
//     console.log("an error occured");
//   }
//   else if(!data){
//     console.log("no object present!")
//   }
//   else{
//     console.log("otp is: ",data.otp)
//   }
// });
// Create a transport object to configure the email server
const transport = nodemailer.createTransport({
    service:"gmail",
  auth: {
    user: 'ankit13112002.sharma@gmail.com', // replace with your email server username
    pass: 'ycdraixktookzsem' // replace with your email server password
  }
});
app.use(cors());

app.post('/api/otp',(req,res)=>{
    
    collection.findOne({'email':req.body.email},(err,data)=>{
      if(err){
        console.log("an error occured");
        res.send({success:false,otp_sent:false})
      }
      else if(!data){
        let otp = Math.floor(1000 + Math.random() * 9000);
        
        collection.insertOne({'email':req.body.email,'otp':otp})
        const mailOptions = {
          from: 'ankit13112002.sharma@gmail.com', // replace with the sender's email address
          to: req.body.email, // replace with the recipient's email address
          subject: 'OTP for authentication', // replace with the email subject
          text: `your OTP for authentication is ${otp}` // replace with the email body
        };
        transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send({success:false,otp_sent:false});
        } else {
            res.send({success: true,otp_sent:true});
        }
        });
      }
      else{
        res.send({success:true,otp_sent:false})
      }
    });
    // const mailOptions = {
    //     from: 'ankit13112002.sharma@gmail.com', // replace with the sender's email address
    //     to: req.body.email, // replace with the recipient's email address
    //     subject: 'OTP for authentication', // replace with the email subject
    //     text: `your OTP for authentication is ${otp}` // replace with the email body
    //   };
    // transport.sendMail(mailOptions, (error, info) => {
    // if (error) {
    //     res.status(500).send(error);
    // } else {
    //     res.send({success: true, otp:otp,message:"sent successfullly"});
    // }
    // });
})

app.get('/api/auth',(req, res) => {
  const email = req.body.email;
  const otp = req.body.password; 
  collection.findOne({ email: email,otp:otp},(err,data)=>{
    if(err){
      res.send({success:false})
    }
    else if(!data){
      res.send({success:false})
    }
    else{
      res.send({success:true})
    }
  })
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
