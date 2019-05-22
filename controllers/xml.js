const builder = require("xmlbuilder");
var xml;
var interfaceCount = 0;
var objectCount = 0;
var objCompCount = 0;
var interfaces;
var objects;
var objInfo;
var objInfoInt;
var objInfoComp;
var isCluster;

exports.getStart = (req, res, next) => {
  const loggedUser = req.session.user;
  
  xml = builder.create("HUFMANWeb", { encoding: 'utf-8' })
  

  interfaceCount = 0;
  objectCount = 0;

  res.render('xml/start', {
    pageTitle: "XML",
    isAuthenticated: req.session.isLoggedIn,
    loggedUser: loggedUser
  });
};

exports.postStart = (req, res, next) => {
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

    res.status(200).redirect('/xml/newXML');
  } else {
    xml = xml.ele("UNIT");
    xml.att('UnitType', "Entity");
    xml.att('ID', unitId);

    interfaces = xml.ele('interfaces');
    objects = xml.ele("Objects");

    res.status(200).redirect('/xml/newXML');
  }  
};

exports.getNewXML = (req, res, next) => {
  const loggedUser = req.session.user;

  res.render('xml/newXML', {
    pageTitle: "XML",
    isAuthenticated: req.session.isLoggedIn,
    loggedUser: loggedUser
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
}

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
}

exports.getObjectConfig = (req, res, next) => {
  const loggedUser = req.session.user;

  res.render('xml/objectConfig', {
    pageTitle: "XML",
    isAuthenticated: req.session.isLoggedIn,
    messages: req.flash(),
    loggedUser: loggedUser
  });
}

exports.getAddComponent = (req, res, next) => {
  const loggedUser = req.session.user;

  res.render('xml/addComponent', {
    pageTitle: "XML",
    isAuthenticated: req.session.isLoggedIn,
    messages: req.flash(),
    loggedUser: loggedUser
  });
}

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
}

exports.getAddInterface = (req, res, next) => {
  const loggedUser = req.session.user;

  res.render('xml/addInterface', {
    pageTitle: "XML",
    isAuthenticated: req.session.isLoggedIn,
    messages: req.flash(),
    loggedUser: loggedUser
  });
}

exports.postAddInterface = (req, res, next) => {
  const ip = req.body.ip;
  const port = req.body.port;

  objInfoInt = objInfo.ele('Interface');

  objInfoInt.att('IP', ip)
    .att('Port', port);

  req.flash('success', 'Interface Added to Object');
  
  res.status(200).redirect('/xml/objectConfig');
}

exports.download = (req, res, next) => {
  const fs = require('fs');
  
  xml.att('Interfaces', interfaceCount);
  objects.att('NumObjects', objectCount);

  interfaceCount = 0;

  fs.writeFileSync('test.xml', xml.end({ pretty: true }), function (err) {
    if (err) {
      return console.log(err);
    }
  });

  res.download('./test.xml', () => {
    fs.unlink('./test.xml', (err) => {
      if (err) {
        console.log(err);
      }
    });
  });



};