const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");
const isAuth = require("../middleware/is-auth");

router.get("/", isAuth, usersController.getUsers);
router.post("/", isAuth);

router.get("/:id", isAuth, usersController.showUser);

module.exports = router;
