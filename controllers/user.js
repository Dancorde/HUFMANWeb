const User = require("../models/user");

exports.getUsers = (req, res, next) => {
  res.render("index");
};
