const User = require("../models/user");

exports.getUsers = (req, res, next) => {
  User.findAll()
    .then(users => {
      res.send(users);
    })
    .catch();  
};
