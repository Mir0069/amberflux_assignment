const express = require("express");

const router = express.Router();

const {
  logUsage,
  getUsageSummary
} = require("../controllers/usageController");

router.post("/", logUsage);

router.get("/summary", getUsageSummary);

module.exports = router;