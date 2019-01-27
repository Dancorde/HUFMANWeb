const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  // username = req.body.username;
  // password = req.body.password;
  // User.findOne({where: {username: username}})
  //   .then(user => {
  //     match = bcrypt.compareSync(password, user.password);
  //     res.send({user, match});
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  
  req.session.isLoggedIn = true;
  res.redirect('/');
};