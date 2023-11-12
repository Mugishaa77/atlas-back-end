const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 7000;

require('dotenv').config();

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
    service: 'Gmail',
    auth: {
  user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Your Gmail email address
   // Use the generated app-specific password
}


  });

  // Create an email message
  const mailOptions = {
    from: form.emailAddress,
    to: 'atlasteabrokersltd@gmail.com', // Replace with the recipient's email address
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

const imageUrls = [
        path.join(__dirname,'pictures', 'ARROKET TEA FACTORY.jpg'),
        path.join(__dirname,'pictures', 'DL KOISAGAT TEA FACTORY.jpg'),
        path.join(__dirname,'pictures', 'EASTERN PRODUCE KENYA.jpg'),
        path.join(__dirname,'pictures', 'EMROK TEA FACTORY LTD(EPZ).jpg'),
        path.join(__dirname,'pictures', 'GATARE TEA COMPANY LTD.jpg'),
        path.join(__dirname,'pictures', 'Gisakura Tea Factory.jpg'),
        path.join(__dirname,'pictures', 'JAMES FINLAY KERICHO.jpg'),
        path.join(__dirname,'pictures', 'KAPCHORUA TEA ESTATE.jpg'),
        path.join(__dirname,'pictures', 'KARIRANA TEA ESTATE.jpg'),
        path.join(__dirname,'pictures', 'karongi tea factory ltd.jpg'),
        path.join(__dirname,'pictures', 'KIBENA TEA ESTATE.jpg'),
        path.join(__dirname,'pictures', 'KIPKEBE TEA LTD.jpg'),
        path.join(__dirname,'pictures', 'KISARU TEA ESTATE.jpg'),
        path.join(__dirname,'pictures', 'KITUMBE TEA FACTORY.jpg'),
        path.join(__dirname,'pictures', 'KORARA HIGHLANDS TEA FACTORY.jpg'),
        path.join(__dirname,'pictures', 'MARAMBA TEA FACTORY.jpg'),
        path.join(__dirname,'pictures', 'MATA TEA COMPANY LTD.jpg'),
        path.join(__dirname,'pictures', 'MOGENI TEA FACTORY.jpg'),
        path.join(__dirname,'pictures', 'MUFINDI TEA PLANTATION.jpg'),
        path.join(__dirname,'pictures', 'muganza-kivu tea factory.jpg'),
        path.join(__dirname,'pictures', 'MULINDI FACTORY COMPANY LTD.jpg'),
        path.join(__dirname,'pictures', 'NANDI TEA ESTATES.jpg'),
        path.join(__dirname,'pictures', 'NYABIHU TEA FACTORY.jpg'),
        path.join(__dirname,'pictures', 'OTB.jpg'),
        path.join(__dirname,'pictures', 'Pfunda Tea Company.jpg'),
        path.join(__dirname,'pictures', ' RUBAYA TEA ESTATE.jpg'),
        path.join(__dirname,'pictures', 'Rwegura Tea Plantation.jpg'),
        path.join(__dirname,'pictures', 'SASINI.jpg'),
        path.join(__dirname,'pictures', 'SHAGASHA TEA FACTORY.jpg'),
        path.join(__dirname,'pictures', 'SORWATHE TEA FACTORY.jpg'),
        path.join(__dirname,'pictures', 'SORWATHE TEA PLANTATION.jpg'),
        path.join(__dirname,'pictures', 'Teza Tea Estate.jpg'),
        path.join(__dirname,'pictures', 'Teza Tea Plantation.jpg')
     ];

     
// Serve your images from the "pictures" directory
app.use('/pictures', express.static(path.join(__dirname, 'pictures')));



     // Create an API endpoint to serve image URLs
app.get('/api/pictures', (req, res) => {
  res.json(imageUrls);
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
