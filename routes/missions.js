const express = require("express");
const router = express.Router();

const missionController = require("../controllers/mission");

const isAuth = require("../middleware/is-auth");

router.get("/", isAuth, missionController.getMissionList);

router.get("/new", isAuth, missionController.getNewMission);
router.post("/new", isAuth, missionController.postNewMission);

module.exports = router;
