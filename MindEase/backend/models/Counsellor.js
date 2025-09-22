import mongoose from "mongoose";

const counsellorSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    license: {
      type: String,
      required: true,
      unique: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { _id: false, timestamps: true }
);

// Check if the model already exists before defining it
const Counsellor = mongoose.models.Counsellor || mongoose.model("Counsellor", counsellorSchema);

export default Counsellor;
