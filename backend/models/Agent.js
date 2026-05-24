const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  description: String,
  risk_level: {
    type: String,
    enum: ["low", "medium", "high"]
  },
  status: {
    type: String,
    enum: ["allowed", "blocked", "pending_review"],
    default: "pending_review"
  },
  reliability_score: Number,

  usage_count: {
    type: Number,
    default: 0
  },

  total_units: {
    type: Number,
    default: 0
  },

  total_cost: {
    type: Number,
    default: 0
  },

  last_decision_reason: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("Agent", agentSchema);