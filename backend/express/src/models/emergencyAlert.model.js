const mongoose = require("mongoose");

const EmergencyAlertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  contactId: { type: mongoose.Schema.Types.ObjectId, ref: "Contact" }, // person notified
  message: String,
  location: {
    lat: Number,
    lng: Number
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("EmergencyAlert", EmergencyAlertSchema);
