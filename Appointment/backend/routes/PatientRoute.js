const express = require('express');
const router = express.Router();
const Patient = require("../models/Patient.js");
const auth = require("../middleware/auth.js");

router.get('/data', async (req, res) => {
    try {
        const allPatients = await Patient.find().populate("userId", "name email role");
        if (!allPatients || allPatients.length === 0) {
            return res.status(404).json({ message: "No patients found" });
        }

        return res.status(200).json({ message: "Patients fetched successfully", patients: allPatients });

    } catch (err) {
        console.error("Error fetching patients:", err);
        return res.status(500).json({ message: "Error while fetching patients data" });
    }
});

router.post('/data', auth, async (req, res) => {
    try {
        const { name, age, gender, phone, bloodGroup, hasChronicDiseases, chronicDiseases, address } = req.body;

        const userId = req.user._id;
        console.log("User id :", userId);

        //------------------------

        const existingPatient = await Patient.findOne({ userId });
        if (existingPatient) {
            return res.status(400).json({
                message: "You already have a patient profile. You can only edit it, not create another."
            });
        }
        //- -----------------------------------
        if (!name || !age || !gender || !phone || !bloodGroup || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const cleanAddress = address.replace(/\n/g, ', ').trim();


        const newPatient = new Patient({
            userId,
            name,
            age,
            gender,
            phone,
            bloodGroup,
            hasChronicDiseases,
            chronicDiseases,
            address: cleanAddress,
        });

        await newPatient.save();
        res.status(201).json({ message: "Patient created successfully", patient: newPatient });
    }
    catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: "Patient profile already exists for this user." });
        }
        console.error('Error creating Patient:', err);
        res.status(500).json({ message: "Server error creating Patient" });
    }
});

router.get("/data/me", auth, async (req, res) => {
    try {
        const userId = req.user._id;
        console.log("User id :", req.user._id);
        const patient = await Patient.findOne({ userId }).populate("userId", "name email role");
        if (!patient) {
            return res.status(404).json({ message: "No patient profile found" });
        }
        res.status(200).json({ message: "Patient profile fetched successfully", data: patient });
    } catch (err) {
        console.error("Error fetching patient profile:", err);
        res.status(500).json({ message: "Error fetching patient profile" });
    }
});

router.get("/data/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const existingPatient = await Patient.findById(id).populate("userId", "name email");

        if (!existingPatient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        return res.status(200).json({ message: "Patient fetched successfully", data: existingPatient });
    } catch (err) {
        console.error("Error while fetching patient:", err);
        return res.status(500).json({ message: "Error while fetching patient data" });
    }
});

router.put("/data/edit/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, gender, phone, bloodGroup, hasChronicDiseases, chronicDiseases, address } = req.body;

        const existingPatient = await Patient.findById(id);
        if (!existingPatient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        if (existingPatient.userId.toString() != req.user._id.toString()) {
            return res.status(403).json({ message: "Not Authorized" });
        }

        const updatedPatient = await Patient.findByIdAndUpdate(id, {
            name,
            age,
            gender,
            phone,
            bloodGroup,
            hasChronicDiseases,
            chronicDiseases,
            address,
        }, { new: true });

        res.status(200).json({ message: "Patient updated successfully", data: updatedPatient });


    } catch (err) {
        console.error("Error while updating patient:", err);
        return res.status(500).json({ message: "Error while updating patient data" });
    }
});


module.exports = router;
