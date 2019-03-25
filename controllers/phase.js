const Phase = require("../models/phase");

exports.getPhaseList = (req, res, next) => {
  const loggedUser = req.session.user;

  Phase.findAll()
    .then(phases => {
      res.render('phases/list', {
        phases: phases,
        isAuthenticated: req.session.isLoggedIn,
        loggedUser: loggedUser
      });
    })
    .catch();
};

exports.getNewPhase = (req, res, next) => {
  res.render("phases/new");
};

exports.postNewPhase = (req, res, next) => {
  missionId = req.body.missionId;
  name = req.body.name;
  
  Phase.create({
    missionId: missionId,
    name: name,
  })
    .then(() => {
      res.redirect("/phases");
    })
    .catch(err => {
      req.flash('error', 'Error.');
      console.log(err);
      res.redirect("/");
    });
};