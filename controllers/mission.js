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

exports.showMission = (req, res, next) => {
  const loggedUser = req.session.user;

  Mission.findByPk(req.params.id)
    .then(mission => {
      if (mission) {
        return res.render("missions/show", {
          mission: mission,
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

exports.deleteMission = (req, res, next) => {

  Mission.findByPk(req.params.id)
    .then(mission => {
      if (!mission) {
        return res.redirect("/missions");
      }
      return mission.destroy();
    })
    .then(result => {
      res.redirect("/missions");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditMission = (req, res, next) => {
  const loggedUser = req.session.user;

  Mission.findByPk(req.params.id)
    .then(mission => {
      if (mission) {
        return res.render("missions/edit", {
          mission: mission,
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

exports.postEditMission = (req, res, next) => {
  const userId = req.params.id;
  const updatedClient = req.body.client;
  const updatedArchitecture = req.body.architecture;
  const updatedContralVant = req.body.centralVant;
  const updatedFormation = req.body.formation;

  Mission.findByPk(userId)
    .then(mission => {
      mission.client = updatedClient;
      mission.architecture = updatedArchitecture;
      mission.centralVant = updatedContralVant;
      mission.formation = updatedFormation;
      return mission.save();
    })
    .then(result => {
      res.status(200).redirect('/missions')
    })
    .catch(err => {
      console.log(err);
    });
};