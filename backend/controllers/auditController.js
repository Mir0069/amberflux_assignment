const AuditLog = require("../models/AuditLog");

exports.getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find().sort({
      timestamp: -1//newest first
    });

    res.json(logs);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};