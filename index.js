const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 7000;

app.get('/', (req, res) => {
  res.send('Welcome to Atlas');
});

app.get('/test', (req, res) => {
  res.send('This is a test route');
});

app.use(cors());
app.use(express.json()); // Use express.json() to parse JSON data
app.use(express.urlencoded({ extended: false })); // Use express.urlencoded() to parse URL-encoded data

// Serve static Excel files
app.use('/excel', (req, res, next) => {
  console.log('Request received for excel:', req.url);
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  next();
}, express.static(path.join(__dirname, 'excel')));

  

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


