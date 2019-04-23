module.exports = (req, res, next) => {
  if (req.session.user.role === "Administrator") {
    return res.render('errors/404');
  }
  next();
};
