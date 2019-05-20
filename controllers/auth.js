const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    isAuthenticated: req.session.isLoggedIn,
    messages: req.flash(),
    layout: 'login'
  });  
};

exports.postLogin = (req, res, next) => {
  username = req.body.username;
  password = req.body.password;
  User.findOne({where: {username: username}})
    .then(user => {
      if(!user){
        req.flash('error', 'Invalid username.');
        return res.redirect('/login');        
      }
      bcrypt.compare(password, user.password)
        .then(doMatch => {
          if (doMatch){
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/dashboard');
            });
          }
          req.flash('error', 'Invalid password.');
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });      
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