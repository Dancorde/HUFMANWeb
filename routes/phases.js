const express = require("express");
const router = express.Router();

const phaseController = require("../controllers/phase");

const isAuth = require("../middleware/is-auth");

router.get("/", isAuth, phaseController.getPhaseList);

router.get("/new", isAuth, phaseController.getNewPhase);
router.post("/new", isAuth, phaseController.postNewPhase);

module.exports = router;
