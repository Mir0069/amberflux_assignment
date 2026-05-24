const Agent = require("../models/Agent");
const Usage = require("../models/Usage");
const AuditLog = require("../models/AuditLog");

const seedAgents = async () => {

  // Clear old data
  await Agent.deleteMany({});
  await Usage.deleteMany({});
  await AuditLog.deleteMany({});

  // =========================
  // AGENTS
  // =========================

  const agents = await Agent.insertMany([
    {
      name: "DocParser",
      description: "Enterprise document parsing AI",
      risk_level: "medium",
      status: "allowed",
      reliability_score: 84,
      usage_count: 25,
      total_units: 400,
      total_cost: 120,
      last_decision_reason: "Reliable performance"
    },

    {
      name: "QuoteBuilder",
      description: "Insurance quote generation agent",
      risk_level: "high",
      status: "pending_review",
      reliability_score: 66,
      usage_count: 8,
      total_units: 110,
      total_cost: 95,
      last_decision_reason: "Awaiting manual approval"
    },

    {
      name: "MailAgent",
      description: "Email automation AI",
      risk_level: "low",
      status: "allowed",
      reliability_score: 93,
      usage_count: 45,
      total_units: 700,
      total_cost: 60,
      last_decision_reason: "Low-risk trusted agent"
    },

    {
      name: "FraudDetector",
      description: "Suspicious fraud detection AI",
      risk_level: "high",
      status: "blocked",
      reliability_score: 58,
      usage_count: 12,
      total_units: 210,
      total_cost: 180,
      last_decision_reason: "Low reliability score"
    }
  ]);

  // =========================
  // USAGE LOGS
  // =========================

  await Usage.insertMany([

    {
      caller: "QuoteBuilder",
      target: "DocParser",
      units: 10,
      cost: 0.25,
      request_id: "REQ001"
    },

    {
      caller: "MailAgent",
      target: "DocParser",
      units: 20,
      cost: 0.5,
      request_id: "REQ002"
    },

    {
      caller: "MailAgent",
      target: "QuoteBuilder",
      units: 15,
      cost: 1.25,
      request_id: "REQ003"
    },

    {
      caller: "DocParser",
      target: "MailAgent",
      units: 8,
      cost: 0.1,
      request_id: "REQ004"
    },

    {
      caller: "QuoteBuilder",
      target: "FraudDetector",
      units: 12,
      cost: 2.1,
      request_id: "REQ005"
    }
  ]);

  // =========================
  // AUDIT LOGS
  // =========================

  await AuditLog.insertMany([

    {
      event_type: "agent_allowed",
      agent_name: "DocParser",
      action: "allowed",
      actor: "admin",
      reason: "Reliable performance"
    },

    {
      event_type: "agent_blocked",
      agent_name: "FraudDetector",
      action: "blocked",
      actor: "security_admin",
      reason: "Reliability below threshold"
    },

    {
      event_type: "usage_logged",
      agent_name: "DocParser",
      action: "usage_added",
      actor: "QuoteBuilder",
      reason: "10 units consumed"
    },

    {
      event_type: "usage_rejected",
      agent_name: "FraudDetector",
      action: "blocked_usage_attempt",
      actor: "QuoteBuilder",
      reason: "Blocked agents cannot be used"
    },

    {
      event_type: "duplicate_usage_ignored",
      agent_name: "DocParser",
      action: "duplicate_request",
      actor: "MailAgent",
      reason: "Duplicate request id ignored"
    },

    {
      event_type: "improvement_suggested",
      agent_name: "QuoteBuilder",
      action: "suggestion_created",
      actor: "system",
      reason: "Low reliability detected"
    }
  ]);

  console.log("Database Seeded Successfully");
};

module.exports = seedAgents;