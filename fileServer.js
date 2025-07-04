const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const app = express();

// Use morgan for HTTP request logging
app.use(morgan('combined'));

const API_KEY = 'mysecretkey';

// API key authentication middleware
function authenticateApiKey(req, res, next) {
  const apiKey = req.header('x-api-key');
  if (apiKey !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or missing API key' });
  }
  next();
}

// Apply authentication middleware to all routes below
app.use(authenticateApiKey);

app.get("/files",function(req,res,next){

fs.readdir(path.join(__dirname,'./files/'), function(err,files){
  if(err){
  // Pass error to centralized error handler
  return next(err);
  }
    else{
      res.json(files);
    }
});

});

const ALLOWED_EXTENSIONS = ['.txt', '.json'];

function isValidFilename(filename) {
  // Prevent directory traversal
  if (filename.includes('..') || path.isAbsolute(filename)) {
    return false;
  }
  // Check allowed extensions
  const ext = path.extname(filename).toLowerCase();
  return ALLOWED_EXTENSIONS.includes(ext);
}

app.get('/file/:filename', function (req, res, next) {
  const filename = req.params.filename;
  if (!isValidFilename(filename)) {
    return res.status(400).json({ error: 'Invalid or unsupported file type.' });
  }
  const filepath = path.join(__dirname, './files/', filename);

  // Use streaming for large files
  const stream = fs.createReadStream(filepath, { encoding: 'utf8' });

  stream.on('error', (err) => {
    // Pass error to centralized error handler
    return next(err);
  });

  stream.pipe(res);
});





app.all('*', (req, res) => {
  res.status(404).send('Route not found');
});

// Centralized error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});













module.exports = app;