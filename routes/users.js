const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");

const isAuth = require("../middleware/is-auth");
const isNotClient = require("../middleware/isNot-client");
const isNotPlanner = require("../middleware/isNot-planner");
const isNotMaitainer = require("../middleware/isNot-maintainer");

router.get("/", isAuth, isNotClient, isNotPlanner, isNotMaitainer, usersController.getUsersList);

router.get("/new", isAuth, isNotClient, isNotPlanner, isNotMaitainer, usersController.getNewUser);
router.post("/new", isAuth, isNotClient, isNotPlanner, isNotMaitainer, usersController.postNewUser);

router.get('/:id/delete', isAuth, isNotClient, isNotPlanner, isNotMaitainer, usersController.postDeleteUser);

router.get("/:id", isAuth, isNotClient, isNotPlanner, isNotMaitainer, usersController.showUser);

router.get("/:id/edit", isAuth, isNotClient, isNotPlanner, isNotMaitainer, usersController.getEditUser);
router.post("/:id", isAuth, isNotClient, isNotPlanner, isNotMaitainer, usersController.postEditUser);

router.use("/download/xml", isAuth, usersController.download);

module.exports = router;
