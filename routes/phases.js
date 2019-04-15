const express = require("express");
const router = express.Router();

const phaseController = require("../controllers/phase");

const isAuth = require("../middleware/is-auth");

router.get("/", isAuth, phaseController.getPhaseList);

router.get("/new", isAuth, phaseController.getNewPhase);
router.post("/new", isAuth, phaseController.postNewPhase);

router.get('/:id/delete', isAuth, phaseController.deletePhase);

router.get("/:id", isAuth, phaseController.showPhase);

router.get("/:id/edit", isAuth, phaseController.getEditPhase);
router.post("/:id", isAuth, phaseController.postEditPhase);

module.exports = router;
