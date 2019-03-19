const Fase = require("../models/phase");

exports.getPhaseList = (req, res, next) => {
  const loggedUser = req.session.user;

  Fase.findAll()
    .then(phases => {
      res.render('phases/list', {
        phases: phases,
        isAuthenticated: req.session.isLoggedIn,
        loggedUser: loggedUser
      });
    })
    .catch();
};
