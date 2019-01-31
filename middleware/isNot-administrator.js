module.exports = (req, res, next) => {
  if (req.session.user.role === "Administrator") {
    return res.redirect("/dashboard");
  }
  next();
};
