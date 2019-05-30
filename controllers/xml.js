const builder = require("xmlbuilder");
const fs = require('fs');

var xml, missionXML;
var interfaceCount = 0;
var objectCount = 0;
var objCompCount = 0;
var interfaces;
var objects;
var objInfo;
var objInfoInt;
var objInfoComp;
var isCluster;
var isCentered;

exports.getStart = (req, res, next) => {
  const loggedUser = req.session.user;

  res.render('xml/start', {
    pageTitle: "XML",
    isAuthenticated: req.session.isLoggedIn,
    loggedUser: loggedUser
  });
};

exports.getConfig = (req, res, next) => {
  const loggedUser = req.session.user;

  xml = builder.create("HUFMANWeb", { encoding: 'utf-8' })

  interfaceCount = 0;
  objectCount = 0;

  res.render('xml/config', {
    pageTitle: "XML",
    isAuthenticated: req.session.isLoggedIn,
    loggedUser: loggedUser
  });
};

exports.postConfig = (req, res, next) => {
  const unitId = req.body.unitId;
  const centered = req.body.centered;

  if (centered == "TRUE") {
    xml
      .ele("OPTIONS")
      .att("CENTRALIZED", centered)
      .att("KNOWN_FORMATION", "TRUE");

    xml = xml.ele("UNIT");

    xml.att('UnitType', "Entity");
    xml.att('ID', unitId);

    interfaces = xml.ele('interfaces');
    objects = xml.ele("Objects");

    isCentered = true;

    res.status(200).redirect('/xml/newXML');
  } else {
    xml = xml.ele("UNIT");
    xml.att('UnitType', "Entity");
    xml.att('ID', unitId);

    interfaces = xml.ele('interfaces');
    objects = xml.ele("Objects");

    isCentered = false;

    res.status(200).redirect('/xml/newXML');
  }
};

exports.getNewXML = (req, res, next) => {
  const loggedUser = req.session.user;

  res.render('xml/newXML', {
    pageTitle: "XML",
    isAuthenticated: req.session.isLoggedIn,
    loggedUser: loggedUser,
    isCentered: isCentered
  });
};

exports.getInterfaces = (req, res, next) => {
  const loggedUser = req.session.user;

  res.render('xml/interfaces', {
    pageTitle: "XML",
    isAuthenticated: req.session.isLoggedIn,
    messages: req.flash(),
    loggedUser: loggedUser
  });
};

exports.postInterfaces = (req, res, next) => {
  const ip = req.body.ip;
  const port = req.body.port;
  const maxConn = req.body.maxConn;

  interfaces.ele('int')
    .att('IP', ip)
    .att('Port', port)
    .att('Max_conn', maxConn);

  interfaceCount++;
  req.flash('success', 'Iterface Added');
  res.status(200).redirect('/xml/interfaces');
};

exports.getObjects = (req, res, next) => {
  const loggedUser = req.session.user;

  objInfo = objects.ele("Object");

  res.render('xml/objects', {
    pageTitle: "XML",
    isAuthenticated: req.session.isLoggedIn,
    messages: req.flash(),
    loggedUser: loggedUser
  });
};

exports.postObjects = (req, res, next) => {
  const unitId = req.body.unitId;
  const unitType = req.body.unitType;

  objInfo.att('UnitType', unitType);
  objInfo.att('ID', unitId);

  objCompCount = 0;
  if (unitType == "Cluster"){
    isCluster = true;
  } else {
    isCluster = false;
  }

  objectCount++;
  req.flash('success', 'Object Created');
  res.status(200).redirect('/xml/objectConfig');
};

exports.getObjectConfig = (req, res, next) => {
  const loggedUser = req.session.user;

  res.render('xml/objectConfig', {
    pageTitle: "XML",
    isAuthenticated: req.session.isLoggedIn,
    messages: req.flash(),
    loggedUser: loggedUser
  });
};

exports.getAddComponent = (req, res, next) => {
  const loggedUser = req.session.user;

  res.render('xml/addComponent', {
    pageTitle: "XML",
    isAuthenticated: req.session.isLoggedIn,
    messages: req.flash(),
    loggedUser: loggedUser
  });
};

exports.postAddComponent = (req, res, next) => {
  const classification = req.body.classification;
  const emergencyState = req.body.emergencyState;

  objInfoComp = objInfo.ele("Component");

  objInfoComp    
    .att('Classification', classification)
    .att('EmergencyState', emergencyState);

  if(isCluster){
    objCompCount++;
    objInfo.att('NumComponents', objCompCount);
  }

  req.flash('success', 'Component Added to Object');

  res.status(200).redirect('/xml/objectConfig');
};

exports.getAddInterface = (req, res, next) => {
  const loggedUser = req.session.user;

  res.render('xml/addInterface', {
    pageTitle: "XML",
    isAuthenticated: req.session.isLoggedIn,
    messages: req.flash(),
    loggedUser: loggedUser
  });
};

exports.postAddInterface = (req, res, next) => {
  const ip = req.body.ip;
  const port = req.body.port;

  objInfoInt = objInfo.ele('Interface');

  objInfoInt.att('IP', ip)
    .att('Port', port);

  req.flash('success', 'Interface Added to Object');
  
  res.status(200).redirect('/xml/objectConfig');
};

exports.getEntity = (req, res, next) => {
  const loggedUser = req.session.user;

  res.render('xml/entity', {
    pageTitle: "XML",
    isAuthenticated: req.session.isLoggedIn,
    messages: req.flash(),
    loggedUser: loggedUser,
    isCentered: isCentered
  });
};

exports.postEntity = (req, res, next) => {
  const id = req.body.id;
  const ip = req.body.ip;
  const port = req.body.port;

  if(isCentered){
    xml = xml.up().ele("SuperEntity");
  } else {
    xml = xml.up().ele("Entity");
  }

  xml.att('ID', id)
    .att('IP', ip)
    .att('Port', port);

  res.status(200).redirect('/xml/newXML');
};

exports.getMission = (req, res, next) => {
  const loggedUser = req.session.user;

  missionXML = builder.create("HUFMANWeb", { encoding: 'utf-8' })

  res.render('xml/mission', {
    pageTitle: "XML",
    isAuthenticated: req.session.isLoggedIn,
    messages: req.flash(),
    loggedUser: loggedUser
  });
};

exports.postMission = (req, res, next) => {
  var phases = missionXML.ele('mission').att('num_phases', 5);

  phases.ele('phase')
    .att('num', 1)
    .att('required_state', req.body.requiredState1)
    .att('mission_specific', req.body.missionSpecific1);
  
  phases.ele('phase')
    .att('num', 2)
    .att('required_state', req.body.requiredState2)
    .att('mission_specific', req.body.missionSpecific2);

  phases.ele('phase')
    .att('num', 3)
    .att('required_state', req.body.requiredState3)
    .att('mission_specific', req.body.missionSpecific3);

  phases.ele('phase')
    .att('num', 4)
    .att('required_state', req.body.requiredState4)
    .att('mission_specific', req.body.missionSpecific4);

  phases.ele('phase')
    .att('num', 5)
    .att('required_state', req.body.requiredState5)
    .att('mission_specific', req.body.missionSpecific5);
  
  fs.writeFileSync('mission.xml', missionXML.end({ pretty: true }), function (err) {
    if (err) {
      return console.log(err);
    }
  });

  res.download('./mission.xml', () => {
    fs.unlink('./mission.xml', (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
};


exports.downloadConfig = (req, res, next) => {
  xml.att('Interfaces', interfaceCount);
  objects.att('NumObjects', objectCount);

  interfaceCount = 0;

  fs.writeFileSync('config.xml', xml.end({ pretty: true }), function (err) {
    if (err) {
      return console.log(err);
    }
  });

  res.download('./config.xml', () => {
    fs.unlink('./config.xml', (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
};