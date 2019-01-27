const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  username = req.body.username;
  password = req.body.password;
  User.findOne({where: {username: username}})
    .then(user => {
      if(user){
        req.session.isLoggedIn = true;
        req.session.user = user;
        res.redirect('/');
      }
      res.redirect('/login');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};