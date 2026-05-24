const Agent = require("../models/Agent");
const Usage = require("../models/Usage");
const AuditLog = require("../models/AuditLog");

exports.logUsage = async (req, res) => {
  try {
    const {
      caller,
      target,
      units,
      cost,
      request_id
    } = req.body;

    const agent = await Agent.findOne({ name: target });

    if (!agent) {
      return res.status(404).json({
        message: "Unknown agent"
      });
    }

    if (agent.status === "blocked") {

      await AuditLog.create({
        event_type: "usage_rejected",
        agent_name: target,
        action: "blocked_usage_attempt",
        actor: caller,
        reason: "Agent is blocked"
      });

      return res.status(403).json({
        message: "Blocked agent cannot be used"
      });
    }

    const duplicate = await Usage.findOne({ request_id });

    if (duplicate) {

      await AuditLog.create({
        event_type: "duplicate_usage_ignored",
        agent_name: target,
        action: "duplicate_request",
        actor: caller,
        reason: "Duplicate request_id"
      });

      return res.json({
        message: "Duplicate ignored"
      });
    }

    await Usage.create({
      caller,
      target,
      units,
      cost,
      request_id
    });

    agent.usage_count += 1;
    agent.total_units += units;
    agent.total_cost += cost;

    await agent.save();

    await AuditLog.create({
      event_type: "usage_logged",
      agent_name: target,
      action: "usage_added",
      actor: caller,
      reason: `${units} units consumed`
    });

    res.json({
      message: "Usage logged successfully"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsageSummary = async (req, res) => {
  try {
    const agents = await Agent.find();

    const summary = agents.map((a) => ({
      name: a.name,
      usage_count: a.usage_count,
      total_units: a.total_units,
      total_cost: a.total_cost
    }));

    res.json(summary);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};