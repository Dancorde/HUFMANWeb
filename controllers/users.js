const User = require("../models/user");

exports.getUsersList = (req, res, next) => {
  const loggedUser = req.session.user;

  User.findAll({
    order: ['username']
  })
    .then(users => {
      res.render('users/list',{
        pageTitle: "Users",
        users: users,
        isAuthenticated: req.session.isLoggedIn,
        loggedUser: loggedUser
      });
    })
    .catch();  
};

exports.showUser = (req, res, next) => {
  const loggedUser = req.session.user;

  User.findByPk(req.params.id)
    .then(user => {
      if (user){
        return res.render("users/show", {
          pageTitle: "Users",
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

  User.findByPk(req.params.id)
    .then(user => {
      if (user) {
        return res.render("users/edit", {
          pageTitle: "Users",
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

  User.findByPk(userId)
    .then(user => {
      user.username = updatedUsername;
      user.password = updatedPassword;
      user.role = updatedRole;
      return user.save();
    })
    .then(result => {
      res.status(200).redirect('/users');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postDeleteUser = (req, res, next) => {
  const userId = req.body.userId;

  User.findByPk(req.params.id)
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
  const loggedUser = req.session.user;
  res.render('users/new', {
    pageTitle: "Users",
    isAuthenticated: req.session.isLoggedIn,
    loggedUser: loggedUser
  });
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


exports.download = function (req, res) {
  const builder = require("xmlbuilder");
  const fs = require('fs');

  User.findAll({
    order: ['username']
  })
    .then(users => {
      const feed = builder.create('users', { encoding: 'utf-8' })
      for (var i = 0; i < users.length; i++) {
        var item = feed.ele('data');
        item.att('username', users[i].username);
        item.att('role', users[i].role);
      }

      console.log(feed.end({ pretty: true }));


      fs.writeFileSync('test.xml', feed.end({ pretty: true }), function (err){
        if(err){
          return console.log(err);
        }
      });

      res.download('./test.xml', () => {
        fs.unlink('./test.xml', (err) => {
          if (err) {
            console.log(err);
          }
        });
      });

      // res.download('./xml/test.xml', 'test.xml');
    })
    .catch();
  


}