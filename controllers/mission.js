const Mission = require("../models/mission");

exports.getMissionList = (req, res, next) => {
  const loggedUser = req.session.user;

  Mission.findAll()
    .then(missions => {
      res.render('missions/list', {
        missions: missions,
        isAuthenticated: req.session.isLoggedIn,
        loggedUser: loggedUser
      });
    })
    .catch();
};

exports.getNewMission = (req, res, next) => {
  res.render("missions/new");
};

exports.postNewMission = (req, res, next) => {
  client = req.body.client;
  architecture = req.body.architecture;
  centralVant = req.body.centralVant;
  formation = req.body.formation;

  Mission.create({
    client: client,
    architecture: architecture,
    centralVant: centralVant,
    formation: formation
  })
    .then(() => {
      res.redirect("/missions");
    })
    .catch(err => {
      req.flash('error', 'Error.');
      console.log(err);
      res.redirect("/");
    });
};