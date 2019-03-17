const Mission = require("../models/mission");

exports.getUsersList = (req, res, next) => {
  const loggedUser = req.session.user;

  User.findAll()
    .then(users => {
      res.render('users/list', {
        users: users,
        isAuthenticated: req.session.isLoggedIn,
        loggedUser: loggedUser
      });
    })
    .catch();
};

exports.showUser = (req, res, next) => {
  const loggedUser = req.session.user;

  User.findById(req.params.id)
    .then(user => {
      if (user) {
        return res.render("users/show", {
          user: user,
          isAuthenticated: req.session.isLoggedIn,
          loggedUser: loggedUser
        });
      }
      res.render('errors/404');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditUser = (req, res, next) => {
  const loggedUser = req.session.user;

  User.findById(req.params.id)
    .then(user => {
      if (user) {
        return res.render("users/edit", {
          user: user,
          isAuthenticated: req.session.isLoggedIn,
          loggedUser: loggedUser
        });
      }
      res.render('errors/404');
    })
    .catch(err => {
      console.log(err);
    });
}

exports.postEditUser = (req, res, next) => {
  const userId = req.params.id;
  const updatedUsername = req.body.username;
  const updatedPassword = req.body.password;
  const updatedRole = req.body.role;

  User.findById(userId)
    .then(user => {
      user.username = updatedUsername;
      user.password = updatedPassword;
      user.role = updatedRole;
      return user.save();
    })
    .then(result => {
      res.status(200).redirect('/users')
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postDeleteUser = (req, res, next) => {
  const userId = req.body.userId;

  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.redirect("/users");
      }
      return user.destroy();
    })
    .then(result => {
      res.redirect("/users");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getNewUser = (req, res, next) => {
  res.render('users/new');
};

exports.postNewUser = (req, res, next) => {
  username = req.body.username;
  password = req.body.password;
  role = req.body.role;

  User.create({
    username: username,
    password: password,
    role: role
  }).then(() => {
    res.redirect("/users");
  }).catch(err => {
    console.log(err);
    res.redirect("/");
  });
};