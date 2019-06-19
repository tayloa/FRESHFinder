'use strict';
require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const cors = require('cors');
const snoowrap = require('snoowrap');
const isProduction = process.env.NODE_ENV === 'production';
const port = (isProduction ? 3000 : 5000 );

// Configure app
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

if(!isProduction) {
  app.use(errorHandler());
}

// Add routes
app.use(require('./routes'));

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});


const server = app.listen((port), () => console.log(`[FRESH]Finder is listening on port ${port}!`));

// GRACEFUL SHUTDOWN
process.on('SIGINT', () => {
  console.info('SIGINT signal received.');
  console.log('Closing http server.');
  server.close(() => {
    console.log('Http server closed.');
    process.exit(0);
  });
});
process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing http server.');
  server.close(() => {
    console.log('Http server closed.');
    process.exit(0);
  });
});
