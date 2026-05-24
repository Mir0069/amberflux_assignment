const Agent = require("../models/Agent");
const AuditLog = require("../models/AuditLog");

exports.getAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.makeDecision = async (req, res) => {
  try {
    const { name } = req.params;

    const { decision, reason, approved_by } = req.body;

    const valid = ["allowed", "blocked", "pending_review"];

    if (!valid.includes(decision)) {
      return res.status(400).json({
        message: "Invalid decision"
      });
    }

    const agent = await Agent.findOne({ name });

    if (!agent) {
      return res.status(404).json({
        message: "Agent not found"
      });
    }

    if (
      agent.risk_level === "high" &&
      decision === "allowed" &&
      !reason
    ) {
      return res.status(400).json({
        message: "Reason required for high-risk approval"
      });
    }

    agent.status = decision;
    agent.last_decision_reason = reason;

    await agent.save();

    await AuditLog.create({
      event_type: `agent_${decision}`,
      agent_name: name,
      action: decision,
      actor: approved_by,
      reason
    });

    res.json({
      message: "Decision updated",
      agent
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};