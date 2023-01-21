import { createTransport } from "nodemailer";
import pkg from "body-parser";
import express from "express";
import cors from "cors";
import { MongoClient, ListCollectionsCursor } from "mongodb";
import { URI, DataBase, studentCollection } from "./Admin/DataBase.js";
import { adminEmail, adminPassword } from "./Admin/Email.js";
const { json } = pkg;
const client = new MongoClient(URI);
class server extends express {
  server() {
    this.super();
    this.otp = "";
    this.collection_users = "";
  }
}

async function main() {
  const app = new server();
  app.use(json());
  try {
    await client.connect();
    const collection_users1 = client.db("current_users").collection("users");

    const collection_courses = client.db("current_users").collection("mycourses");

    // Create a transport object to configure the email server
    const transport = createTransport({
      service: "gmail",
      auth: {
        user: adminEmail, // replace with your email server username
        pass: adminPassword, // replace with your email server password
      },
    });
    app.use(cors());
    var userEmail = "";
    var userType = "";
    app.post("/api/login", async (req, res) => {
      console.log(req.body.data);
      userEmail = req.body.data.email;
      userType = req.body.data.usertype;
      if (userType === 0)
        app.collection_users = client
          .db("current_users")
          .collection("students");
      else if (userType === 1)
        app.collection_users = client
          .db("current_users")
          .collection("instructors");
      else
        app.collection_users = client
          .db("current_users")
          .collection("advisors");
      const data = await app.collection_users
        .find({ email: userEmail })
        .project({})
        .toArray();
      console.log(data);
      if (data[0].email === userEmail) {
        res.send({ success: true });
        app.otp = String(Math.floor(Math.random() * 1000 + 1000));
        let mailDetails = {
          from: adminEmail,
          to: userEmail,
          subject: "OTP",
          text: app.otp,
        };
        transport.sendMail(mailDetails, (err, _data) => {
          if (err) {
            console.log("The following error occured while sending mail.");
            console.log(err.message);
          } else {
            console.log("Message sent successfully.");
          }
        });
      }
      // eslint-disable-next-line no-unused-expressions
      else {
        res.send({ success: false });
      }
    });
    app.post("/api/otp", async (req, res) => {
      console.log(req.body.data);
      const OTP = req.body.data.otp;
      //  const data = await collection_users.find({email:email}).project({}).toArray()
      //  console.log(data)
      if (OTP === app.otp) {
        res.send({ success: true });
      }
      // eslint-disable-next-line no-unused-expressions
      else {
        res.send({ success: false });
      }
    });

    app.post("/api/courses", async (req, res) => {
      try{
        let obj = req.body
        console.log(obj)
        if(req.body.advisor_email !== undefined)
          {
            let collection_advisors = client.db('current_users').collection('advisors')
            obj = await collection_advisors.findOne({email : req.body.advisor_email})
            obj = {dept : obj.dept}
          }
        const data = await collection_courses.find(obj).project({}).toArray();
        console.log(data)
        res.send({ data: data });
      }
      catch(e)
        {
          res.send({message : e})
        }
    });

    app.post("/api/student_list", async (req, res) => {
      const data = await collection_users1
        .find({ email: req.body.data.email })
        .project({})
        .toArray();
      res.send({ name: data[0].name })
    });

    app.post("/api/student/enroll", async (req, res) => {
      const studentMail = req.body.studentMail;
      const courseCode = req.body.courseCode;
      try {
        const data = await collection_courses.findOne({
          course_code: courseCode,
        });
        if (studentMail in data.students)
          res.send({ message: "Student Already Requested" });
        else {
          app.collection_users = client
            .db("current_users")
            .collection("students");
            let studentDetails = {};
            try {
            studentDetails = await app.collection_users.findOne({
              email: studentMail,
            });
          } catch (e) {
            res.send(e);
          }
          try {
            await collection_courses.updateOne(
              { course_code: courseCode },
              {
                $set: {
                  students: [
                    ...data.students,
                    [studentDetails.email, studentDetails.name, 1],
                  ],
                },
              }
            );
          } catch (e) {
            res.send(e);
          }
          res.send({ message: "Student Successfully Requested" });
        }
      } catch (e) {
        res.send(e);
      }
    });
    app.post('/api/instructor/instructorResponse',async (req,res) => {
      let response = req.body.response
      let courseCode = req.body.courseCode
      let studentMail = req.body.studentMail
      const data = await collection_courses.findOne({
        course_code: courseCode,
      });
      let updatedStudentsArray = data.students
      let l = updatedStudentsArray.length
      let finalStatus = 4
      if(response)
          finalStatus = 2;
      for(let i = 0;i<l;i++)
        {
          if(updatedStudentsArray[i][0] === studentMail)
            {
              updatedStudentsArray[i][2] = finalStatus;
              break;
            }
        }
        try {
          await collection_courses.updateOne(
            { course_code: courseCode },
            {
              $set: {
                students: updatedStudentsArray,
              },
            }
          );
        } catch (e) {
          res.send({message : e});
        }
      res.send({message : "Operation Successfull."})
    })
    app.post('/api/advisor/advisorResponse',async (req,res) => {
      let response = req.body.response
      let courseCode = req.body.courseCode
      let studentMail = req.body.studentMail
      const data = await collection_courses.findOne({
        course_code: courseCode,
      });
      let updatedStudentsArray = data.students
      let l = updatedStudentsArray.length
      let finalStatus = 4
      if(response)
          finalStatus = 3;
      for(let i = 0;i<l;i++)
        {
          if(updatedStudentsArray[i][0] === studentMail)
            {
              updatedStudentsArray[i][2] = finalStatus;
              break;
            }
        }
        try {
          await collection_courses.updateOne(
            { course_code: courseCode },
            {
              $set: {
                students: updatedStudentsArray,
              },
            }
          );
        } catch (e) {
          res.send({message : e});
        }
      res.send({message : "Operation Successfull."})
    })
    const port = process.env.PORT || 5000
    app.listen(port, () => {
      console.log("Server is running on port 5000");
    });
  } catch (error) {
    console.log(error.message);
  }
}

main().catch((e) => console.log(e));
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
