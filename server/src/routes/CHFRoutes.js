const express = require("express");
const CHFController = require("../controllers/CHFController");
const router = express.Router();

router.route("/").get(CHFController.baseGet);
router.route("/latest").get(CHFController.latestGet);

module.exports = router;
