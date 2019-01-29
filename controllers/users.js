const User = require("../models/user");

exports.getUsers = (req, res, next) => {
  User.findAll()
    .then(users => {
      res.render('users/list',{
        users: users,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch();  
};

exports.showUser = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      res.render("users/show", {
        user: user,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => {
      console.log(err);      
    });
};