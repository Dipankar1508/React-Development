const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Appointment = require("../models/Appointment");
const adminAuth = require("../middleware/admin");

// ======================
//  ADMIN LOGIN
// ======================
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Invalid Credentials" });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ role: "admin", id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ message: "Login successful ", token });
});


// ======================
//  ADMIN DASHBOARD STATS
// ======================
router.get("/dashboard", adminAuth, async (req, res) => {
    try {
        const users = await User.find().select("name email role");
        const doctors = await Doctor.find().populate("userId", "name email");
        const patients = await Patient.find().populate("userId", "name email");
        const appointments = await Appointment.find()
            .populate("doctorId", "name")
            .populate("patientId", "name");

        res.json({ users, doctors, patients, appointments });
    } catch (err) {
        console.error("Dashboard Load Error:", err);
        res.status(500).json({ message: "Server Error" });
    }
});


// ======================
//  MANAGE USERS
// ======================
router.get("/users", adminAuth, async (req, res) => {
    const users = await User.find().select("-password");
    res.json(users);
});

router.delete("/users/:id", adminAuth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Try deleting doctor profile if exists (does NOT depend on role)
        const doctor = await Doctor.findOneAndDelete({ userId: user._id });
        if (doctor) {
            await Appointment.deleteMany({ doctorId: doctor._id });
        }

        // Try deleting patient profile if exists (does NOT depend on role)
        const patient = await Patient.findOneAndDelete({ userId: user._id });
        if (patient) {
            await Appointment.deleteMany({ patientId: patient._id });
        }

        // Delete user always at end
        await User.findByIdAndDelete(req.params.id);

        res.json({
            message: "✅ User deleted successfully along with any linked profiles and appointments (if existed)"
        });

    } catch (error) {
        console.error("Delete User Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});




// ======================
//  MANAGE DOCTORS
// ======================
router.get("/doctors", adminAuth, async (req, res) => {
    const doctors = await Doctor.find().populate("userId", "name email");
    res.json(doctors);
});

router.delete("/doctors/:id", adminAuth, async (req, res) => {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: "Doctor deleted ✅" });
});

// ======================
//  MANAGE PATIENTS
// ======================
router.get("/patients", adminAuth, async (req, res) => {
    const patients = await Patient.find().populate("userId", "name email");
    res.json(patients);
});

router.delete("/patients/:id", adminAuth, async (req, res) => {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: "Patient deleted ✅" });
});

// ======================
//  MANAGE APPOINTMENTS
// ======================
router.get("/appointments", adminAuth, async (req, res) => {
    const appointments = await Appointment.find()
        .populate("doctorId", "name")
        .populate("patientId", "name");
    res.json(appointments);
});

router.delete("/appointments/:id", adminAuth, async (req, res) => {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted ✅" });
});

module.exports = router;
