const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const uploadedFile = req.files.uploadedFile;
  const filePath = path.join(__dirname, 'public', uploadedFile.name);

  uploadedFile.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('File uploaded!');
  });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
