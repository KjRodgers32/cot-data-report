const express = require("express");
const PairsController = require("../controllers/PairsController");
const router = express.Router();

router.route("/").get(PairsController.baseGet);
router.route("/latest").get(PairsController.latestGet);

module.exports = router;
