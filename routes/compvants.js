const express = require("express");
const router = express.Router();

const compVantController = require("../controllers/compvant");

const isAuth = require("../middleware/is-auth");

router.get("/", isAuth, compVantController.getCompVantList);

router.get("/new", isAuth, compVantController.getNewCompVant);
router.post("/new", isAuth, compVantController.postNewCompVant);

router.get('/:id/delete', isAuth, compVantController.deleteCompVant);

router.get("/:id", isAuth, compVantController.showCompVant);

router.get("/:id/edit", isAuth, compVantController.getEditCompVant);
router.post("/:id", isAuth, compVantController.postEditCompVant);

module.exports = router;
