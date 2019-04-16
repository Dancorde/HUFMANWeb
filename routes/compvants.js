const express = require("express");
const router = express.Router();

const compVantController = require("../controllers/compvant");

const isAuth = require("../middleware/is-auth");

router.get("/", isAuth, compVantController.getCompVantList);

router.get("/new", isAuth, compVantController.getNewCompVant);
// router.post("/new", isAuth, compVantController.);

// router.get('/:id/delete', isAuth, compVantController.);

// router.get("/:id", isAuth, compVantController.);

// router.get("/:id/edit", isAuth, compVantController.);
// router.post("/:id", isAuth, compVantController.);

module.exports = router;
