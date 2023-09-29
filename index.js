const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');


const app = express();
const PORT = process.env.PORT || 7000;

app.get('/', (req, res) => {
  res.send('Welcome to Atlas');
});

app.get('/test', (req, res) => {
  res.send('This is a test route');
});

app.get('/email', (req, res) => {
  res.send('This is the email GET route');
});

app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

app.post('/email', (req, res) => {
  const form = req.body; // Assuming your form data is in JSON format

  // Configure nodemailer to send emails using your email service (e.g., Outlook)
  const transporter = nodemailer.createTransport({
    service: 'Outlook',
  });

  // Create an email message
  const mailOptions = {
    from: form.emailAddress,
    to: 'info@atlastea.co.ke', // Replace with the recipient's email address
    subject: form.subject,
    text: `From: ${form.fullName}\nEmail: ${form.emailAddress}\nMessage: ${form.messageItem}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send email' }); // Respond with JSON error message
    } else {
      console.log('Email sent:', info.response);
      res.json({ message: 'Email sent successfully' }); // Respond with JSON success message
    }
  });
});


mongoose.connect('mongodb+srv://sallywanga2016:Mugisha77@cluster0.2atceva.mongodb.net/atlasTeaBrokersLimited', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});
db.once('open', () => {
  console.log('Connected to Mugisha-s Database');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
