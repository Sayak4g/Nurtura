const mongoose = require("mongoose");

const VideoCallLogSchema = new mongoose.Schema({
  callerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  callStart: Date,
  callEnd: Date,
  status: { type: String, enum: ["missed", "completed", "rejected"], default: "completed" }
});

module.exports = mongoose.model("VideoCallLog", VideoCallLogSchema);
