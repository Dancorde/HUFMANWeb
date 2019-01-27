const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login"
  });
};

exports.postLogin = (req, res, next) => {
  res.render("index", {
    pageTitle: "Login"
  });
};