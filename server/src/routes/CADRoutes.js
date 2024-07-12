const express = require("express");
const CADController = require("../controllers/CADController");
const router = express.Router();

router.route("/").get(CADController.baseGet);
router.route("/latest").get(CADController.latestGet);

module.exports = router;
