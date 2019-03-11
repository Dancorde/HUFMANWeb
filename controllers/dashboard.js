const User = require("../models/user");

exports.getDashboard = (req, res, next) => {
  const loggedUser = req.session.user;
  const role = loggedUser.role.toLowerCase();

  res.render("dashboards/" + role, {
    pageTitle: "Home",
    isAuthenticated: req.session.isLoggedIn,
    user: loggedUser
  });
};
