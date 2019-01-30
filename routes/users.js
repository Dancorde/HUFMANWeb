const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");
const isAuth = require("../middleware/is-auth");
const isAdministrator = require("../middleware/is-administrator");

router.get("/", isAuth, isAdministrator, usersController.getUsersList);

router.get("/new", isAuth, usersController.getNewUser);
router.post("/new", isAuth, usersController.postNewUser);

router.get('/:id/delete', isAuth, usersController.postDeleteUser);

router.get("/:id", isAuth, usersController.showUser);

router.get("/:id/edit", isAuth, usersController.getEditUser);
router.post("/:id", isAuth, usersController.postEditUser);

module.exports = router;
