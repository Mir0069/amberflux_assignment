const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },

  event_type: String,

  agent_name: String,

  action: String,

  actor: String,

  reason: String
});

module.exports = mongoose.model("AuditLog", auditLogSchema);