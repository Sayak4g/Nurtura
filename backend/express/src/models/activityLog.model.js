const mongoose = require("mongoose");

const ActivityLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["game", "habit"], required: true },
  activityName: String,
  score: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ActivityLog", ActivityLogSchema);
