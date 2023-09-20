const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Import the path module

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Welcome to Atlas');
});

app.use(cors());
app.use(bodyParser.json());

// Serve static PDF files from the "reports" folder with proper content type
app.use('/reports', (req, res, next) => {
  // Set the Content-Type header to indicate that the response is a PDF
  res.setHeader('Content-Type', 'application/pdf');
  next();
}, express.static(path.join(__dirname, 'reports')));

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
