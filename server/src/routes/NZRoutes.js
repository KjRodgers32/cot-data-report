const express = require("express");
const NZController = require("../controllers/NZController");
const router = express.Router();

router.route("/").get(NZController.baseGet);
router.route("/latest").get(NZController.latestGet);

module.exports = router;
