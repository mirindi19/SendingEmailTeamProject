function googleCallback(req, res) {
    // Redirect the user to the homepage or another page
    passport.authenticate('google', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/login');
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect('/');
      });
    })(req, res, next);
  //console.log('signed in');
  }
  
  module.exports = {
    googleCallback
  };
  