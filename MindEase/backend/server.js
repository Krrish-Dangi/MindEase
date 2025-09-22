import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Routes import
import authRoutes from "./routes/auth.js";
import appointmentsRouter from "./routes/appointments.js";
import counsellorRoutes from "./routes/counsellors.js"; // <-- 1. Naya route import kiya

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentsRouter);
app.use("/api/counsellors", counsellorRoutes); // <-- 2. Naya route register kiya

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ Error connecting DB:", err));

// Test route
app.get("/", (req, res) => res.send("API running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`⚡ Server running on port ${PORT}`));
