const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors"); 
const dotenv = require("dotenv");

dotenv.config(); 

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
  secure: false,
});

app.post("/logButtonClick", (req, res) => {
  console.log("Received POST request to /logButtonClick");
  const clickedText = req.body.clickedText;
  console.log("Clicked Text:", clickedText);
  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: "Website Button Clicked",
    text: `The button was clicked. Viewed text: ${clickedText}`,
  };

  console.log("Email: "+process.env.EMAIL);
  console.log("Password: "+process.env.PASSWORD);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Button click logged and email sent");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
