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
  res.render("compvants/new");
};

exports.postNewCompVant = (req, res, next) => {
  name = req.body.name;
  typeId = req.body.typeId;
  valueId = req.body.valueId;

  CompVant.create({
    name: name,
    typeId: typeId,
    valueId: valueId
  })
    .then(() => {
      res.redirect("/compvants");
    })
    .catch(err => {
      req.flash("error", "Error.");
      console.log(err);
      res.redirect("/");
    });
};

exports.showCompVant = (req, res, next) => {
  const loggedUser = req.session.user;

  CompVant.findByPk(req.params.id)
    .then(compVant => {
      if (compVant) {
        return res.render("compvants/show", {
          compVant: compVant,
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

exports.deleteCompVant = (req, res, next) => {

  CompVant.findByPk(req.params.id)
    .then(compVant => {
      if (!compVant) {
        return res.redirect("/compvants");
      }
      return compVant.destroy();
    })
    .then(result => {
      res.redirect("/compvants");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditCompVant = (req, res, next) => {
  const loggedUser = req.session.user;

  CompVant.findByPk(req.params.id)
    .then(compVant => {
      if (compVant) {
        return res.render("compvants/edit", {
          compVant: compVant,
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

exports.postEditCompVant = (req, res, next) => {
  const compVantId = req.params.id;
  const updatedname = req.body.name;
  const updatedtypeId = req.body.typeId;
  const updatedvalueId = req.body.valueId;

  CompVant.findByPk(compVantId)
    .then(compVant => {
      compVant.name = updatedname;
      compVant.typeId = updatedtypeId;
      compVant.valueId = updatedvalueId;
      return compVant.save();
    })
    .then(result => {
      res.status(200).redirect('/compvants')
    })
    .catch(err => {
      console.log(err);
    });
};
