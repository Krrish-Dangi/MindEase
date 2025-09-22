import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ["student", "counsellor", "admin"], required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  college: { type: String },
  gender: { type: String },
  dob: { type: Date },
  language: { type: String, default: "en" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
