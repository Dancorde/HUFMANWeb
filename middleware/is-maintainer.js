module.exports = (req, res, next) => {
  if (req.session.user.role !== "Maintainer") {
    return res.redirect("/dashboard");
  }
  next();
};
