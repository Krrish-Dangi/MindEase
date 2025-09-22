import mongoose from "mongoose";

const moodEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dayIndex: { type: Number, required: true },
  moodEmoji: { type: String },
  moodScore: { type: Number },
  stressLevel: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("MoodEntry", moodEntrySchema);
