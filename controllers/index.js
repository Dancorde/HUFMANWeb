const User = require('../models/user');

exports.getHome = (req, res, next) => {
  const loggedUser = req.session.user;

  res.render("index", {
    pageTitle: "Home",
    isAuthenticated: req.session.isLoggedIn,
    loggedUser: loggedUser
  });
};
