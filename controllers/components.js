const Component = require("../models/component");

exports.getComponentList = (req, res, next) => {
  const loggedUser = req.session.user;

  Component.findAll()
    .then(components => {
      res.render("components/list", {
        pageTitle: "Components",
        components: components,
        isAuthenticated: req.session.isLoggedIn,
        loggedUser: loggedUser
      });
    })
    .catch();
};

exports.getNewComponent = (req, res, next) => {
  const loggedUser = req.session.user;
  res.render("components/new", {
    pageTitle: "Components",
    isAuthenticated: req.session.isLoggedIn,
    loggedUser: loggedUser
  });
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


exports.showComponent = (req, res, next) => {
  const loggedUser = req.session.user;

  Component.findByPk(req.params.id)
    .then(component => {
      if (component) {
        return res.render("components/show", {
          pageTitle: "Components",
          component: component,
          isAuthenticated: req.session.isLoggedIn,
          loggedUser: loggedUser
        });
      }
      res.render('errors/404', {
        isAuthenticated: req.session.isLoggedIn,
        loggedUser: loggedUser
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.deleteComponent = (req, res, next) => {

  Component.findByPk(req.params.id)
    .then(component => {
      if (!component) {
        return res.redirect("/components");
      }
      return component.destroy();
    })
    .then(result => {
      res.redirect("/components");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditComponent = (req, res, next) => {
  const loggedUser = req.session.user;

  Component.findByPk(req.params.id)
    .then(component => {
      if (component) {
        return res.render("components/edit", {
          pageTitle: "Components",
          component: component,
          isAuthenticated: req.session.isLoggedIn,
          loggedUser: loggedUser
        });
      }
      res.render('errors/404', {
        isAuthenticated: req.session.isLoggedIn,
        loggedUser: loggedUser
      });
    })
    .catch(err => {
      console.log(err);
    });
}

exports.postEditComponent = (req, res, next) => {
  const componentId = req.params.id;
  const updatedName = req.body.name;
  const updatedSerialNumber = req.body.serialNumber;
  const updatedBrand = req.body.brand;

  Component.findByPk(componentId)
    .then(component => {
      component.name = updatedName;
      component.serialNumber = updatedSerialNumber;
      component.brand = updatedBrand;
      return component.save();
    })
    .then(result => {
      res.status(200).redirect('/components')
    })
    .catch(err => {
      console.log(err);
    });
};
