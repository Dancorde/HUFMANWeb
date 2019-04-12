const express = require("express");
const router = express.Router();

const compVantController = require("../controllers/compvant");

const isAuth = require("../middleware/is-auth");

router.get("/", isAuth, compVantController.getCompVantList);

module.exports = router;
