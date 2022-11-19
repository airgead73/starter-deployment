const { authSecret, baseURL, clientID, issuerURL} = require('./env');

const authConfig = {
  authRequired: false,
  auth0Logout: true,
  issuerBaseURL: issuerURL,
  baseURL: baseURL,
  clientID: clientID,
  secret: authSecret,
  idpLogout: true,   
}

module.exports = {
  authConfig
}