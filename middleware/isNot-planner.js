module.exports = (req, res, next) => {
  if (req.session.user.role === "Planner") {
    return res.render('errors/404', {
      pageTitle: "ERROR",
      isAuthenticated: req.session.isLoggedIn,
      loggedUser: req.session.user
    });
  }
  next();
};
