const express = require("express");
const router = express.Router();

const vantController = require("../controllers/vant");

const isAuth = require("../middleware/is-auth");

router.get("/", isAuth, vantController.getVantList);

router.get("/new", isAuth, vantController.getNewVant);
router.post("/new", isAuth, vantController.postNewVant);

router.get('/:id/delete', isAuth, vantController.deleteVant);

router.get("/:id", isAuth, vantController.showVant);

router.get("/:id/edit", isAuth, vantController.getEditVant);
router.post("/:id", isAuth, vantController.postEditVant);

module.exports = router;
