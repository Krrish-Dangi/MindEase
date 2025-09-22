import express from "express";
import mongoose from "mongoose";
import Appointment from "../models/Appointment.js";
import User from "../models/User.js";
import Counsellor from "../models/Counsellor.js";

const router = express.Router();

// GET /api/appointments/slots?date=YYYY-MM-DD
router.get("/slots", async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ message: "Date query parameter is required" });
    }

    const selectedDate = new Date(date);

    // Define all possible time slots for a day
    const baseSlots = [
      '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
      '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
    ];

    // Find appointments that are already booked for the selected date
    const bookedAppointments = await Appointment.find({
      date: selectedDate,
      status: { $in: ["pending", "confirmed"] }
    }).select('time -_id'); // Select only the 'time' field

    const bookedTimes = bookedAppointments.map(appt => appt.time);

    // Create the final list of slots with their availability
    const availableSlots = baseSlots.map(time => ({
      time,
      available: !bookedTimes.includes(time),
    }));

    res.status(200).json(availableSlots);

  } catch (err) {
    console.error("Error fetching time slots:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Naya route: Student ki booked appointments ko fetch kare
router.get("/student/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;
    const appointments = await Appointment.find({ patientId }).populate({
      path: 'counsellorId',
      model: 'Counsellor',
      populate: {
        path: '_id',
        model: 'User',
        select: 'name' // Sirf naam field ko select karein
      },
      select: 'specialization' // specialization field ko select karein
    });

    res.status(200).json(appointments);
  } catch (err) {
    console.error("Error fetching student appointments:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// POST /api/appointments/book
router.post("/book", async (req, res) => {
  const session = await mongoose.startSession();
  try {
    const { patientId, counsellorId, date, time, mode = "video", language = "en", reason = "", college = "" } = req.body;

    if (!patientId || !counsellorId || !date || !time) {
      return res.status(400).json({ message: "patientId, counsellorId, date and time are required" });
    }

    // basic existence checks
    const [patient, counsellor] = await Promise.all([
      User.findById(patientId),
      Counsellor.findById(counsellorId) // `User` se `Counsellor` model check kiya
    ]);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    if (!counsellor) return res.status(404).json({ message: "Counsellor not found" });

    // conflict check: same counsellor, same date & time, and not cancelled/completed
    const appointmentDate = new Date(date); // ensure proper Date object
    const conflict = await Appointment.findOne({
      counsellorId,
      date: appointmentDate,
      time,
      status: { $in: ["pending", "confirmed"] }
    });
    if (conflict) return res.status(409).json({ message: "This slot is already booked" });

    // transaction: create appointment and push into counsellor (and optionally user)
    let newAppointment;
    await session.withTransaction(async () => {
      const appt = await Appointment.create([{
        patientId, counsellorId, college, status: "pending",
        date: appointmentDate, time, mode, language, reason
      }], { session });
      
      newAppointment = appt[0];
      const apptId = newAppointment._id;
    });

    await session.endSession();
    return res.status(201).json({ message: "Appointment booked successfully!", appointment: newAppointment });
  } catch (err) {
    await session.endSession();
    console.error("Booking error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
