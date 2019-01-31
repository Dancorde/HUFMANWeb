module.exports = (req, res, next) => {
  if (req.session.user.role === "Client") {
    return res.redirect("/dashboard");
  }
  next();
};
