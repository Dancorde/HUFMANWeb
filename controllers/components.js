const Component = require("../models/component");

exports.getComponentList = (req, res, next) => {
  const loggedUser = req.session.user;

  Component.findAll()
    .then(components => {
      res.render("components/list", {
        components: components,
        isAuthenticated: req.session.isLoggedIn,
        loggedUser: loggedUser
      });
    })
    .catch();
};

exports.getNewComponent = (req, res, next) => {
  res.render("components/new");
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
