const Agent = require("../models/Agent");
const AuditLog = require("../models/AuditLog");

exports.getSuggestions = async (req, res) => {

  try {

    const agents = await Agent.find();

    let suggestions = [];

    for (let agent of agents) {

      // Low reliability
      if (agent.reliability_score < 70) {

        suggestions.push({
          agent: agent.name,
          suggestion: "Suggest review or blocking due to low reliability"
        });

      }

      // High cost low usage
      if (
        agent.total_cost > 100 &&
        agent.usage_count < 15
      ) {

        suggestions.push({
          agent: agent.name,
          suggestion: "High infrastructure cost but low usage"
        });

      }

      // High usage low reliability
      if (
        agent.usage_count > 20 &&
        agent.reliability_score < 75
      ) {

        suggestions.push({
          agent: agent.name,
          suggestion: "Improve reliability for heavily used agent"
        });

      }

      // Pending review
      if (agent.status === "pending_review") {

        suggestions.push({
          agent: agent.name,
          suggestion: "Approval pending for extended duration"
        });

      }

      // Blocked but usage attempts exist
      if (
        agent.status === "blocked" &&
        agent.usage_count > 5
      ) {

        suggestions.push({
          agent: agent.name,
          suggestion: "Repeated blocked usage attempts detected"
        });

      }
    }

    // Create audit logs
    for (let item of suggestions) {

      await AuditLog.create({
        event_type: "improvement_suggested",
        agent_name: item.agent,
        action: "suggestion_created",
        actor: "system",
        reason: item.suggestion
      });

    }

    res.json(suggestions);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};