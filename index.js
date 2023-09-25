const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

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

// Serve individual PDF files from the "reports" folder
app.get('/reports/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, 'reports', fileName);

  // Set the Content-Type header to indicate that the response is a PDF
  res.setHeader('Content-Type', 'application/pdf');

  // Set the Content-Disposition header with the dynamic filename
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

  // Serve the file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(404).send('File not found');
    } else {
      res.send(data);
    }
  });
});


// Define a route to serve the contents of a folder as a JSON object
app.get('/reports', async (req, res) => {
  const folderPath = path.join(__dirname, 'reports');
  try {
    const files = await fs.readdir(folderPath);
    const folderContents = {
      folder: folderPath,
      files: files,
    };
    res.json(folderContents);
  } catch (error) {
    console.error('Error reading folder:', error);
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
