const async = require('async');

const User = require("../models/user");
const VANT = require("../models/vant");
const Component = require("../models/component");
const CompVant = require("../models/compvant");
const Phase = require("../models/phase");
const Mission = require("../models/mission");

exports.getDashboard = async (req, res, next) => {
  const loggedUser = req.session.user;
  const role = loggedUser.role.toLowerCase();

  var usersQtd = await User.count();
  var vantsQtd = await VANT.count();
  var componentsQtd = await Component.count();
  var compVantsQtd = await CompVant.count();
  var missionsQtd = await Mission.count();
  var phasesQtd = await Phase.count();

  console.log(usersQtd);
  res.render("dashboards/" + role, {
    pageTitle: "Dashboard",
    isAuthenticated: req.session.isLoggedIn,
    loggedUser: loggedUser,
    usersQtd: usersQtd,
    vantsQtd: vantsQtd,
    compVantsQtd: compVantsQtd,
    missionsQtd: missionsQtd,
    phasesQtd: phasesQtd,
    componentsQtd: componentsQtd    
  }); 
};

// exports.getDashboard = async function(req, res){
//   const loggedUser = req.session.user;
//   const role = loggedUser.role.toLowerCase();
  
//   var usersQtd = await User.count();

//   console.log(usersQtd);
//   res.render("dashboards/" + role, {
//     pageTitle: "Dashboard",
//     isAuthenticated: req.session.isLoggedIn,
//     loggedUser: loggedUser,
//     usersQtd: usersQtd
//   });
// }