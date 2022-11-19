const checkAuthClient = function(req, res, next) {
  const { isAuthenticated } = res.locals;

  if(isAuthenticated) {
    return next();
  } else {
    return res.status(401).redirect('/login');
  }

}

module.exports = checkAuthClient;