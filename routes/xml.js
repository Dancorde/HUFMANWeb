const express = require("express");
const router = express.Router();

const xmlController = require("../controllers/xml");

router.get("/", xmlController.getStart);

router.get("/config", xmlController.getConfig);
router.post("/config", xmlController.postConfig);

router.get("/newXML", xmlController.getNewXML);

router.get("/interfaces", xmlController.getInterfaces);
router.post("/interfaces", xmlController.postInterfaces);

router.get("/objects", xmlController.getObjects);
router.post("/objects", xmlController.postObjects);

router.get("/objectConfig", xmlController.getObjectConfig);

router.get("/addComponent", xmlController.getAddComponent);
router.post("/addComponent", xmlController.postAddComponent);

router.get("/addInterface", xmlController.getAddInterface);
router.post("/addInterface", xmlController.postAddInterface);

router.get("/entity", xmlController.getEntity);
router.post("/entity", xmlController.postEntity);

router.get("/downloadConfig", xmlController.downloadConfig);

router.get("/mission", xmlController.getMission);
router.post("/mission", xmlController.postMission);

module.exports = router;