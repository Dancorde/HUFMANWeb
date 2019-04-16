const express = require("express");
const router = express.Router();

const componentController = require("../controllers/components");

const isAuth = require("../middleware/is-auth");

router.get("/", isAuth, componentController.getComponentList);

router.get("/new", isAuth, componentController.getNewComponent);
router.post("/new", isAuth, componentController.postNewComponent);

router.get('/:id/delete', isAuth, componentController.deleteComponent);

router.get("/:id", isAuth, componentController.showComponent);

router.get("/:id/edit", isAuth, componentController.getEditComponent);
router.post("/:id", isAuth, componentController.postEditComponent);

module.exports = router;
