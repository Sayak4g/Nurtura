const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // owner of this contact
  name: String,
  phone: String,
  email: String,
  relation: String, // e.g. Family, Doctor, Friend
  profilePic: String
});

module.exports = mongoose.model("Contact", ContactSchema);
