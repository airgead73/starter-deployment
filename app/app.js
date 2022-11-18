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
app.get((req, res, next) => {
  res.send('Practice for deploying apps.');
});
/**
 * error handling
 */
/**
 * export app
 */
module.exports = app;
