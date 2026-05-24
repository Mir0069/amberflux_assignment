const mongoose = require("mongoose");

const usageSchema = new mongoose.Schema({
  caller: String,
  target: String,
  units: Number,
  cost: Number,

  request_id: {
    type: String,
    unique: true
  },

  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Usage", usageSchema);