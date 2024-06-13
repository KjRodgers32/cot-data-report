const express = require("express");
const AUDController = require("../controllers/AUDController");
const router = express.Router();

router.route("/").get(AUDController.baseGet);
router.route("/latest").get(AUDController.latestGet);

module.exports = router;
