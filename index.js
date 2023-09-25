const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');


const app = express();
const PORT = process.env.PORT || 7000;

app.get('/', (req, res) => {
  res.send('Welcome to Atlas');
});

app.get('/test', (req, res) => {
  res.send('This is a test route');
});

app.use(cors());
app.use(express.json());

// Serve static Excel files
app.use('/excel', (req, res, next) => {
  console.log('Request received for excel:', req.url);
  // Set the Content-Type header to indicate that the response is an Excel file
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  next();
}, express.static(path.join(__dirname, 'excel')));


// Define a route to serve the contents of a folder as a JSON object
app.get('/reports', async (req, res) => {
  const folderPath = path.join(__dirname, 'reports');
  try {
    const files = await fs.readdir(folderPath);
    const folderContents = {
      folder: folderPath,
      files: files,
    };
    console.log('folderPath:', folderPath);
console.log('filename:', filename);

    res.json(folderContents);
  } catch (error) {
    console.error('Error reading folder:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Define your URLs with the fallback to localhost:7000
const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:7000';

// Create a route to serve PDF files by URL
app.get('/reports/:filename', async (req, res) => {
  const { filename } = req.params;
  const pdfUrl = `${baseUrl}/reports/${filename}`;

  try {
    // Use 'axios' to fetch the PDF file from the URL
    const response = await axios.get(pdfUrl, { responseType: 'arraybuffer' });

    // Set the response headers for PDF file
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=${filename}`);
    res.send(response.data); // Send the PDF content as the response
  } catch (error) {
    console.error('Error fetching PDF:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});
