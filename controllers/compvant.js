const CompVant = require("../models/compvant");

exports.getCompVantList = (req, res, next) => {
  const loggedUser = req.session.user;

  CompVant.findAll()
    .then(compVants => {
      res.render("compvants/list", {
        compVants: compVants,
        isAuthenticated: req.session.isLoggedIn,
        loggedUser: loggedUser
      });
    })
    .catch();
};