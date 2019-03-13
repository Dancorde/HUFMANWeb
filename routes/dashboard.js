const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboard");

const isAuth = require("../middleware/is-auth");

router.get("/", isAuth, dashboardController.getDashboard);

module.exports = router;
