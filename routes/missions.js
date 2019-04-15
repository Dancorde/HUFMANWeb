const express = require("express");
const router = express.Router();

const missionController = require("../controllers/mission");

const isAuth = require("../middleware/is-auth");

router.get("/", isAuth, missionController.getMissionList);

router.get("/new", isAuth, missionController.getNewMission);
router.post("/new", isAuth, missionController.postNewMission);

router.get('/:id/delete', isAuth, missionController.deleteMission);

router.get("/:id", isAuth, missionController.showMission);

router.get("/:id/edit", isAuth, missionController.getEditMission);
router.post("/:id", isAuth, missionController.postEditMission);

module.exports = router;
