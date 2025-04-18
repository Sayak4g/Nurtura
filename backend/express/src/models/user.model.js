import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, unique: true },
  email: { type: String, unique: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  height: { type: String, required: true },
  weight: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  maritalStatus: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  allergies: { type: String, required: true },
  medicalConditions: { type: String, required: true },
  medications: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zipCode: { type: String, required: true },

  profilePic: String,
  
  emergencyContact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact" // Assigned ONE contact for SOS
  },

  contacts: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Contact" 
  }]
});

module.exports = mongoose.model("User", UserSchema);
