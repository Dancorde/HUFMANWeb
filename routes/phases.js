const express = require("express");
const router = express.Router();

const phaseController = require("../controllers/phase");

const isAuth = require("../middleware/is-auth");

router.get("/", isAuth, phaseController.getPhaseList);

module.exports = router;
