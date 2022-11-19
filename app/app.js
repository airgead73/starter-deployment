/**
 * external imports
 */
const express = require('express');
const { auth } = require('express-openid-connect');
const path = require('path');
const cookieParser = require('cookie-parser');
/**
 * internal imports
 */
const { testMessage, isDev } = require('./config/env');
const { authConfig } = require('./config');
const { checkAuthClient } = require('./middleware');
/**
 * app activation
 */
const app = express();
app.use(auth(authConfig));
/**
 * middleware
 */
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/**
 * locals
 */
app.use(function(req, res, next) {
  res.locals.isAuthenticated = req.oidc.isAuthenticated();
  next();
});
/**
 * routes
 */
app.get('/', (req, res, next) => {
  const { isAuthenticated } = res.locals;

  if(isAuthenticated) {
    return res.status(200).render('template', {
      success: true,
      pagePath: './pages/LoggedIn'
    });
  } else {
    return res.status(401).render('template', {
      success: false,
      pagePath: './pages/NotLoggedIn'
    });
  }
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

  res.send(`PATH: ${req.path}, ERROR: ${err.message}`);

});
/**
 * export app
 */
module.exports = app;
