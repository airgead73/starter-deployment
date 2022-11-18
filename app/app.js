/**
 * external imports
 */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
/**
 * app activation
 */
const app = express();
/**
 * middleware
 */
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
/**
 * routes
 */
app.get('/', (req, res, next) => {
  res.send('Practice for deploying apps.');
});
/**
 * error handling
 */
app.use(function(req, res, next) {
  const error = new Error('path not found.');
  next(error);
});

app.use(function(err, req, res, next) {
  let status;
  if(!err.status) {
    status = 500;
  } else {
    status = err.status;
  }

  res.send(`STATUS: ${status}, ERROR: ${err.message}`);

});
/**
 * export app
 */
module.exports = app;
