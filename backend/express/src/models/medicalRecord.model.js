const mongoose = require("mongoose");

const MedicalRecordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fileUrl: { type: String, required: true },
  fileName: String,
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("MedicalRecord", MedicalRecordSchema);
