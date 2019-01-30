const User = require("../models/user");

exports.getDashboard = (req, res, next) => {
  const user = req.session.user;
  const role = user.role.toLowerCase();

  // if (role === 'administrator'){
  //   res.render("dashboards/administrator", {
  //     pageTitle: "Home",
  //     isAuthenticated: req.session.isLoggedIn,
  //     user: user
  //   });
  // } else if (role === 'planner') {
  //   res.render("dashboards/planner", {
  //     pageTitle: "Home",
  //     isAuthenticated: req.session.isLoggedIn,
  //     user: user
  //   });
  // }

  res.render("dashboards/" + role, {
    pageTitle: "Home",
    isAuthenticated: req.session.isLoggedIn,
    user: user
  });
};
