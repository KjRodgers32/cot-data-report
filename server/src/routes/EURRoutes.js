const express = require("express");
const EURController = require("../controllers/EURController");
const router = express.Router();

router.route("/").get(EURController.baseGet);
router.route("/latest").get(EURController.latestGet);

module.exports = router;
