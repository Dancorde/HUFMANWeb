const express = require("express");
const router = express.Router();

const componentController = require("../controllers/components");

const isAuth = require("../middleware/is-auth");

router.get("/", isAuth, componentController.getComponentList);

router.get("/new", isAuth, componentController.getNewComponent);
router.post("/new", isAuth, componentController.postNewComponent);

module.exports = router;
