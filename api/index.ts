const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000; // Use the environment port if available, otherwise default to 3000

// Middleware for parsing multipart/form-data
app.use(fileUpload());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Handle file upload
app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const uploadedFile = req.files.uploadedFile;
  const filePath = path.join(__dirname, '../public', uploadedFile.name);

  uploadedFile.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('File uploaded successfully!');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
