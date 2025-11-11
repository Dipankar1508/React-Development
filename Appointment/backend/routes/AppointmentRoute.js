const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment.js');
const Doctor = require('../models/Doctor.js');
const Patient = require('../models/Patient.js');
const auth = require('../middleware/auth.js');

// =======================================
// 🔍 1️⃣ Autocomplete route for doctor names
// =======================================
router.get('/doctors/names', async (req, res) => {
    try {
        const { query } = req.query;

        // Case-insensitive search by doctor name
        const doctors = await Doctor.find({
            name: { $regex: query, $options: 'i' },
        }).select('_id name specialization');

        if (!doctors.length) {
            return res.status(404).json({ message: "No matching doctors found" });
        }

        res.status(200).json({ message: "Doctors fetched successfully", doctors });
    } catch (err) {
        console.error("Error fetching doctor names:", err);
        res.status(500).json({ message: "Error fetching doctor names" });
    }
});


// ===================================================
// 🩺 2️⃣ Patient books appointment (with doctorId)
// ===================================================
router.post("/book/:id", auth, async (req, res) => {
    try {
        const doctorId = req.params.id;
        const { date } = req.body;

        if (!date) return res.status(400).json({ message: "Date is required" });

        const doctor = await Doctor.findById(doctorId);
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });

        const patient = await Patient.findOne({ userId: req.user._id });
        if (!patient) return res.status(404).json({ message: "Patient profile not found" });

        // ✅ Fix weekday calculation (handles IST correctly)
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const weekday = weekdays[new Date(date + "T00:00:00").getDay()];

        if (!doctor.availableDays.includes(weekday)) {
            return res.status(400).json({ message: `Doctor is not available on ${weekday}.` });
        }

        if (!doctor.availableDays.includes(weekday)) {
            return res.status(400).json({ message: `Doctor is not available on ${weekday}.` });
        }

        // ✅ Patient must not already have an appointment same date
        const patientDateConflict = await Appointment.findOne({
            patientId: patient._id,
            date,
            status: { $ne: "Cancelled" }
        });

        if (patientDateConflict) {
            return res.status(400).json({
                message: "You already have an appointment booked on this date.",
            });
        }

        const newAppointment = new Appointment({
            doctorId,
            doctorName: doctor.name,
            specialization: doctor.specialization,
            patientId: patient._id,
            patientName: patient.name,
            date,
        });

        await newAppointment.save();
        res.status(201).json({ message: "Appointment booked successfully ✅", data: newAppointment });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error booking appointment" });
    }
});


// ===================================================
// 👨‍⚕️ 3️⃣ Get all appointments for a specific doctor
// ===================================================
router.get('/doctor/:doctorId', auth, async (req, res) => {
    try {
        const { doctorId } = req.params;

        const appointments = await Appointment.find({ doctorId })
            .populate('patientId', 'name gender phone')
            .sort({ date: 1 });

        if (!appointments.length) {
            return res.status(404).json({ message: "No appointments found for this doctor" });
        }

        res.status(200).json({
            message: "Appointments fetched successfully",
            data: appointments,
        });
    } catch (error) {
        console.error("Error fetching doctor appointments:", error);
        res.status(500).json({ message: "Server error fetching doctor appointments" });
    }
});

// ===================================================
// 🧑‍⚕️ 4️⃣ Get all appointments for a specific patient
// ===================================================
router.get('/patient/:patientId', auth, async (req, res) => {
    try {
        const { patientId } = req.params;

        const appointments = await Appointment.find({ patientId })
            .populate('doctorId', 'name specialization')
            .sort({ date: 1 });

        if (!appointments.length) {
            return res.status(404).json({ message: "No appointments found for this patient" });
        }

        res.status(200).json({
            message: "Appointments fetched successfully",
            data: appointments,
        });
    } catch (error) {
        console.error("Error fetching patient appointments:", error);
        res.status(500).json({ message: "Server error fetching patient appointments" });
    }
});

// ================================================
// Update the status to completed and Canceled
// ================================================
router.put("/update/:id", auth, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["Pending", "Completed", "Cancelled"];
    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
    }

    try {
        const appointment = await Appointment.findById(id);
        if (!appointment) return res.status(404).json({ message: "Appointment not found" });

        const current = appointment.status;

        // Transition Rules
        const validTransitions = {
            "Pending": ["Completed", "Cancelled"],
            "Completed": ["Pending"],
            "Cancelled": ["Pending"]
        };

        if (!validTransitions[current].includes(status)) {
            return res.status(400).json({ message: `Cannot change ${current} → ${status}` });
        }

        appointment.status = status;
        await appointment.save();

        res.status(200).json({
            message: "Appointment status updated successfully",
            data: appointment,
        });

    } catch (error) {
        console.error("Error updating appointment status:", error);
        res.status(500).json({ message: "Server error updating appointment" });
    }
});

module.exports = router;
