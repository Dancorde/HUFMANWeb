module.exports = (req, res, next) => {
  if (req.session.user.role === "Planner") {
    return res.redirect("/dashboard");
  }
  next();
};
