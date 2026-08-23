const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  passengerId: {
    type: String,
    default: () => `EZY-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
  },
  emergencyContact: {
    name: { type: String, default: "Emergency Contact" },
    relation: { type: String, default: "Relative" },
    phone: { type: String, default: "" }
  },
  accessibilityPreferences: {
    prefersSeniorFriendly: { type: Boolean, default: false },
    lessWalking: { type: Boolean, default: false },
    accessibleTransport: { type: Boolean, default: false },
    dietaryRestriction: { type: String, default: "None" }
  },
  travelPreferences: {
    budget: { type: String, default: "Moderate" },
    interests: { type: [String], default: ["Spiritual", "Heritage"] },
    style: { type: String, default: "Standard" },
    defaultSource: { type: String, default: "Delhi" }
  },
  savedStays: {
    type: [String],
    default: []
  },
  savedExperiences: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
