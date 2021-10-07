const withAuth = (req, res, next) => {
    // If the user isn't logged in, redirect them to the login route
    // when attempting to view highscore page
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;