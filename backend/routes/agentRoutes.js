const express = require("express");

const router = express.Router();

const {
  getAgents,
  makeDecision
} = require("../controllers/agentController");

router.get("/", getAgents);

router.post("/:name/decision", makeDecision);

module.exports = router;