import express from "express";
import User from "../models/User.js";
import Counsellor from "../models/Counsellor.js";
import Appointment from "../models/Appointment.js"; // Appointment model import kiya

const router = express.Router();

// GET all counsellors
router.get("/", async (req, res) => {
  try {
    const counsellorUsers = await User.find({ role: "counsellor" });

    if (!counsellorUsers.length) {
      return res.status(200).json([]);
    }

    const counsellors = await Promise.all(
      counsellorUsers.map(async (user) => {
        const counsellorDetails = await Counsellor.findById(user._id);
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          languages: user.language ? user.language.split(',').map(l => l.trim()) : [],
          availability: 'available',
          location: 'Online',
          rating: 4.8,
          specialization: counsellorDetails?.specialization || 'General Counseling',
          experience: `${counsellorDetails?.experience || 0} years`,
          sessionTypes: ['video', 'chat'],
          nextSlot: '2:00 PM Today'
        };
      })
    );
    res.status(200).json(counsellors);
  } catch (err) {
    console.error("Error fetching counsellors:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Naya route: Counsellor ki appointments fetch kare
router.get("/appointments/:counsellorId", async (req, res) => {
  try {
    const { counsellorId } = req.params;
    const appointments = await Appointment.find({ counsellorId }).populate({
        path: 'patientId',
        model: 'User',
        select: 'name email college'
    });
    
    const formattedAppointments = appointments.map(appt => ({
        id: appt._id,
        student: {
            id: appt.patientId._id,
            name: appt.patientId.name,
            email: appt.patientId.email,
            college: appt.patientId.college
        },
        date: appt.date.toISOString().split('T')[0],
        time: appt.time,
        type: appt.mode,
        status: appt.status,
        reason: appt.reason,
        notes: "No notes yet",
        sessionDuration: 60
    }));
    
    res.status(200).json(formattedAppointments);
  } catch (err) {
    console.error("Error fetching counsellor appointments:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Naya route: Appointment status update kare
router.put("/appointments/:appointmentId/status", async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const { status } = req.body;

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            { status },
            { new: true, runValidators: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.status(200).json(updatedAppointment);
    } catch (err) {
        console.error("Error updating appointment status:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});


export default router;
