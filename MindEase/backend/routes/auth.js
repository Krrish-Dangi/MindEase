import express from "express";
import User from "../models/User.js";
import Counsellor from "../models/Counsellor.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// SIGN UP
router.post("/signup", async (req, res) => {
  console.log("Request body:", req.body); // <-- DEBUG

  try {
    const { role, name, email, password, college, gender, dob, language, license, specialization, experience } = req.body;

    const trimmedLicense = license?.trim();
    const trimmedSpecialization = specialization?.trim();

    // Validation
    if (role === "counsellor" && (!trimmedLicense || !trimmedSpecialization)) {
      return res.status(400).json({ message: "License and specialization are required for counsellors" });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      role,
      name,
      email,
      passwordHash,
      language,
      ...(role === "student" && { college, gender, dob }),
    });

    await user.save();
    console.log("User saved:", user._id);

    if (role === "counsellor") {
      const counsellor = new Counsellor({
        _id: user._id,
        license: trimmedLicense,
        specialization: trimmedSpecialization,
        experience: Number(experience) || 0,
      });
      await counsellor.save();
    }
    

    res.status(201).json({ message: "User created successfully", userId: user._id });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// SIGN IN
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Send full user info
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
        college: user.college,
        gender: user.gender,
        dob: user.dob,
        language: user.language
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
