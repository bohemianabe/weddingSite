const express = require("express");
const app = express();
// to send email of the response
const nodemailer = require("nodemailer");
const PORT = process.env.PORT || 8080;
// dotenv
require("dotenv").config();

// middleware
app.use(express.static("resources"));
// middleware to grab the data
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/resources/homePage/home.html");
});

// a post method to get the data from rsvp
app.post("/", (req, res) => {
  console.log(req.body);

  // set up the nodemailer to email the form
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWD,
    },
  });

  // mail options with details
  const mailOptions = {
    from: `agarrido84@gmail.com`,
    to: "agarrido84@gmail.com",
    subject: `${req.body.fName} ${req.body.lName} has responded to your wedding invitation.`,
    text: `${req.body.fName} ${req.body.attending}\n${req.body.messg}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("Email sent: " + info.response);
      res.send("success");
    }
  });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// ACCIME TRY

// data parsing
// app.use(
//   express.urlencoded({
//     extended: false,
//   })
// );
// app.use(express.json());

// app.use(express.static(path.join(__dirname, "/")));
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "/", "index.html"));
// });

// app.post("/email", (req, res) => {
//   // send email here
//   res.json({ message: "Message received!!!" });
// });

// app.listen(PORT, () => {
//   console.log("Server is listening on port ", PORT);
// });
