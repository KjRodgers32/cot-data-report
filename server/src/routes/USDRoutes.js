const express = require("express");
const USDController = require("../controllers/USDController");
const router = express.Router();

router.route("/").get(USDController.baseGet);
router.route("/latest").get(USDController.latestGet);

module.exports = router;
