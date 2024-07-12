const express = require("express");
const JPYController = require("../controllers/JPYController");
const router = express.Router();

router.route("/").get(JPYController.baseGet);
router.route("/latest").get(JPYController.latestGet);

module.exports = router;
