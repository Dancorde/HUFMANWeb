const Vant = require("../models/vant");

exports.getVantList = (req, res, next) => {
  const loggedUser = req.session.user;

  Vant.findAll()
    .then(vants => {
      res.render('vants/list', {
        pageTitle: "VANTs",
        vants: vants,
        isAuthenticated: req.session.isLoggedIn,
        loggedUser: loggedUser
      });
    })
    .catch();
};

exports.getNewVant = (req, res, next) => {
  const loggedUser = req.session.user;

  res.render("vants/new", {
    pageTitle: "VANTs",
    isAuthenticated: req.session.isLoggedIn,
    loggedUser: loggedUser
  });
};

exports.postNewVant = (req, res, next) => {
  const typeId = req.body.typeId;
  const valueId = req.body.valueId;
  const model = req.body.model;
  const type = req.body.type;
  const manufacturer = req.body.manufacturer;
  const comunication = req.body.comunication;
  const tecType = req.body.tecType;
  const tecAddress = req.body.tecAddress;

  Vant.create({
    typeId: typeId,
    valueId: valueId,
    model: model,
    type: type,
    manufacturer: manufacturer,
    comunication: comunication,
    tecType: tecType,
    tecAddress: tecAddress
  })
    .then(() => {
      res.redirect("/vants");
    })
    .catch(err => {
      req.flash('error', 'Error.');
      console.log(err);
      res.redirect("/");
    });
};

exports.showVant = (req, res, next) => {
  const loggedUser = req.session.user;

  Vant.findByPk(req.params.id)
    .then(vant => {
      if (vant) {
        return res.render("vants/show", {
          pageTitle: "VANTs",
          vant: vant,
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

exports.deleteVant = (req, res, next) => {

  Vant.findByPk(req.params.id)
    .then(vant => {
      if (!vant) {
        return res.redirect("/vants");
      }
      return vant.destroy();
    })
    .then(result => {
      res.redirect("/vants");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditVant = (req, res, next) => {
  const loggedUser = req.session.user;

  Vant.findByPk(req.params.id)
    .then(vant => {
      if (vant) {
        return res.render("vants/edit", {
          pageTitle: "VANTs",
          vant: vant,
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

exports.postEditVant = (req, res, next) => {
  const vantId = req.params.id;
  const updatedTypeId = req.body.typeId;
  const updatedValueId = req.body.valueId;
  const updatedModel = req.body.model;
  const updatedType = req.body.type;
  const updatedManufacturer = req.body.manufacturer;
  const updatedComunication = req.body.comunication;
  const updatedTecType = req.body.tecType;
  const updatedTecAddress = req.body.tecAddress;

  Vant.findByPk(vantId)
    .then(vant => {
      vant.typeId = updatedTypeId;
      vant.valueId = updatedValueId;
      vant.model = updatedModel;
      vant.type = updatedType;
      vant.manufacturer = updatedManufacturer;
      vant.comunication = updatedComunication;
      vant.tecType = updatedTecType;
      vant.tecAddress = updatedTecAddress;
      return vant.save();
    })
    .then(result => {
      res.status(200).redirect('/vants')
    })
    .catch(err => {
      console.log(err);
    });
};