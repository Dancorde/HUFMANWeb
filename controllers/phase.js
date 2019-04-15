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

exports.showPhase = (req, res, next) => {
  const loggedUser = req.session.user;

  Phase.findByPk(req.params.id)
    .then(phase => {
      if (phase) {
        return res.render("phases/show", {
          phase: phase,
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

exports.deletePhase = (req, res, next) => {

  Phase.findByPk(req.params.id)
    .then(phase => {
      if (!phase) {
        return res.redirect("/phases");
      }
      return phase.destroy();
    })
    .then(result => {
      res.redirect("/phases");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditPhase = (req, res, next) => {
  const loggedUser = req.session.user;

  Phase.findByPk(req.params.id)
    .then(phase => {
      if (phase) {
        return res.render("phases/edit", {
          phase: phase,
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

exports.postEditPhase = (req, res, next) => {
  const userId = req.params.id;
  const updatedMissionId = req.body.missionId;
  const updatedname = req.body.name;

  Phase.findByPk(userId)
    .then(phase => {
      phase.missionId = updatedMissionId;
      phase.name = updatedname;
      return phase.save();
    })
    .then(result => {
      res.status(200).redirect('/phases')
    })
    .catch(err => {
      console.log(err);
    });
};