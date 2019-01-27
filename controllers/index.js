const User = require('../models/user');

exports.getHome = (req, res, next) => {
  res.render("index", {
    pageTitle: 'Home'
  });
};
