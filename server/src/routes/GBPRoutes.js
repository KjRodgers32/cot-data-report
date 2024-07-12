const express = require("express");
const GBPController = require("../controllers/GBPController");
const router = express.Router();

router.route("/").get(GBPController.baseGet);
router.route("/latest").get(GBPController.latestGet);

module.exports = router;
