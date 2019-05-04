const express = require("express");
const router = express.Router();

const xmlController = require("../controllers/xml");

router.get("/", xmlController.getStart);
router.post("/", xmlController.postStart);

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

router.get("/download", xmlController.download);

module.exports = router;