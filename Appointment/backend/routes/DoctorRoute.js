const express = require('express');
const router = express.Router();
const Doctor = require("../models/Doctor.js");
const auth = require("../middleware/auth.js");

// GET all doctors
router.get('/data', async (req, res) => {
    try {
        const allDoctors = await Doctor.find().populate("userId", "name email role")
        if (!allDoctors || allDoctors.length === 0)
            return res.status(404).json({ message: "No doctors found" });

        res.status(200).json({ message: "Doctors fetched successfully", data: allDoctors });

    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ message: "Server error fetching doctors" });
    }
});

router.post("/data", auth, async (req, res) => {
    try {
        const { name, specialization, experienceYears, consultationFee, availableDays, availableSlots } = req.body;

        const userId = req.user._id;
        console.log("User id :", userId);

        const existingDoctor = await Doctor.findOne({ userId });
        if (existingDoctor) {
            return res.status(400).json({
                message: "You already have a doctor profile. You can only edit it, not create another.",
            });
        }

        if (!userId || !name || !specialization)
            return res.status(400).json({ message: "Missing required fields" });


        // 🕒 Convert and validate time slots
        const convertedSlots = availableSlots.map((slot, index) => {
            const start = new Date(`1970-01-01T${slot.startTime}:00Z`);
            const end = new Date(`1970-01-01T${slot.endTime}:00Z`);

            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                throw new Error(`Invalid time format in slot #${index + 1}`);
            }

            // ⏰ If startTime is greater than or equal to endTime, assume overnight shift
            if (end <= start) {
                end.setDate(end.getDate() + 1); // shift to next day
            }

            return { startTime: start, endTime: end };
        });

        const newDoctor = new Doctor({
            userId,
            name,
            specialization,
            experienceYears,
            consultationFee,
            availableDays,
            availableSlots: convertedSlots,
        });

        await newDoctor.save();
        res.status(201).json({ message: "Doctor created successfully", data: newDoctor });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Doctor profile already exists for this user." });
        }
        console.error('Error creating doctor:', error);
        res.status(500).json({ message: "Server error creating doctor" });
    }

});

router.get("/data/me", auth, async (req, res) => {
    try {
        const userId = req.user._id;

        const doctor = await Doctor.findOne({ userId }).populate("userId", "name email role");

        if (!doctor) {
            return res.status(404).json({ message: "No doctor profile found for this user" });
        }

        res.status(200).json({
            message: "Doctor profile fetched successfully",
            data: doctor
        });
    } catch (error) {
        console.error("Error fetching doctor profile:", error);
        res.status(500).json({ message: "Server error fetching doctor profile" });
    }
});

router.get("/data/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const existingDoctor = await Doctor.findById(id).populate("userId", "name email");
        if (!existingDoctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json({ message: "Doctor found", data: existingDoctor });
    } catch (error) {
        console.error('Error fetching doctor:', error);
        res.status(500).json({ message: "Server error fetching doctor" });
    }
});


router.put("/data/edit/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, specialization, experienceYears, consultationFee, availableDays, availableSlots } = req.body;

        // 🔹 Fetch the doctor first
        const doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        // 🔹 Check if logged-in user is the owner
        if (doctor.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized to edit this doctor" });
        }

        // 🔹 Perform update
        doctor.name = name || doctor.name;
        doctor.specialization = specialization || doctor.specialization;
        doctor.experienceYears = experienceYears || doctor.experienceYears;
        doctor.consultationFee = consultationFee || doctor.consultationFee;
        doctor.availableDays = availableDays || doctor.availableDays;
        doctor.availableSlots = availableSlots || doctor.availableSlots;

        const updatedDoctor = await doctor.save();
        res.status(200).json({ message: "Doctor updated successfully", data: updatedDoctor });
    } catch (error) {
        console.error("Error updating doctor:", error);
        res.status(500).json({ message: "Server error updating doctor" });
    }
});


module.exports = router;
