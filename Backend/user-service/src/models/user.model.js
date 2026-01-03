const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registerNumber: { type: String, required: true }, // college registration
  dateOfBirth: { type: Date }, // optional
  department: { type: String }, // optional
  isSeller: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);