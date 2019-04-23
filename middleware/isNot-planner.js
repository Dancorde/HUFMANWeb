module.exports = (req, res, next) => {
  if (req.session.user.role === "Planner") {
    return res.render('errors/404');
  }
  next();
};
