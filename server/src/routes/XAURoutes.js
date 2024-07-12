const express = require("express");
const XAUController = require("../controllers/XAUController");
const router = express.Router();

router.route("/").get(XAUController.baseGet);
router.route("/latest").get(XAUController.latestGet);

module.exports = router;
