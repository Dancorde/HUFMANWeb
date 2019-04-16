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

exports.getNewCompVant = (req, res, next) => {
  res.render("compvant/new");
};

exports.postNewComponent = (req, res, next) => {
  name = req.body.name;
  brand = req.body.brand;
  serialNumber = req.body.serialNumber;

  Component.create({
    name: name,
    serialNumber: serialNumber,
    brand: brand
  })
    .then(() => {
      res.redirect("/components");
    })
    .catch(err => {
      req.flash("error", "Error.");
      console.log(err);
      res.redirect("/");
    });
};
