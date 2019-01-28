const express = require("express");
const router = express.Router();

const usersController = require("../controllers/user");
const isAuth = require("../middleware/is-auth");

router.get("/", isAuth, usersController.getUsers);

module.exports = router;
