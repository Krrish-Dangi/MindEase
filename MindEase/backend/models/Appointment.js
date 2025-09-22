import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  // Yahan `ref: "counsellor"` ko `ref: "Counsellor"` mein badal diya hai
  counsellorId: { type: mongoose.Schema.Types.ObjectId, ref: "Counsellor", required: true },
  college: { type: String },
  status: { type: String, enum: ["pending","confirmed","cancelled","completed"], default: "pending" },
  date: { type: Date, required: true },   // store ISO date (day)
  time: { type: String, required: true }, // "2:00 PM" or "14:00" — keep format consistent
  mode: { type: String, enum: ["video","chat","in-person"], default: "video" },
  language: { type: String, default: "en" },
  reason: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Appointment", appointmentSchema);
