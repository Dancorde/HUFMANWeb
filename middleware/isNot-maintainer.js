module.exports = (req, res, next) => {
  if (req.session.user.role === "Maintainer") {
    return res.render('errors/404');
  }
  next();
};
