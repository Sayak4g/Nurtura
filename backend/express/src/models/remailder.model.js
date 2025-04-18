const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["meal", "hydration", "exercise"], required: true },
  time: String,
  frequency: { type: String, enum: ["daily", "weekly"], default: "daily" },
  active: { type: Boolean, default: true }
});

module.exports = mongoose.model("Reminder", ReminderSchema);
