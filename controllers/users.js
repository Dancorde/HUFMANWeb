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
      if (user){
        return res.render("users/show", {
          user: user,
          isAuthenticated: req.session.isLoggedIn
        });
      }  
      res.render('errors/404');
    })
    .catch(err => {
      console.log(err);      
    });
};

exports.getEditUser = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        return res.render("users/edit", {
          user: user,
          isAuthenticated: req.session.isLoggedIn
        });
      }
      res.render('errors/404');
    })
    .catch(err => {
      console.log(err);
    });
}