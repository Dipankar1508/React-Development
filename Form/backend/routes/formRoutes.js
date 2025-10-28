const express = require('express');
const router = express.Router();
const Form = require("../models/form.model.js");

// ✅ GET all data
router.get("/data", async (req, res) => {
    try {
        const alldata = await Form.find();
        res.status(200).json({ message: "Fetched Successfully", data: alldata });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ POST new form entry
router.post("/input", async (req, res) => {
    try {
        const { name, email, age, profession } = req.body;
        const newData = new Form({ name, email, age, profession });
        await newData.save();
        res.status(201).json({ message: "Form created successfully", data: newData });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ GET single data by ID
router.get("/data/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Form.findById(id);
        if (!data) return res.status(404).json({ message: "Data not found" });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ UPDATE data by ID
router.put("/data/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, age, profession } = req.body;
        const data = await Form.findByIdAndUpdate(
            id,
            { name, email, age, profession },
            { new: true }
        );
        if (!data) {
            return res.status(404).json({ message: "Data not found" });
        }
        res.status(200).json({ message: "Updated successfully", data });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ DELETE data by ID
router.delete("/data/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Form.findByIdAndDelete(id);
        if (!data) return res.status(404).json({ message: "Data not found" });
        res.status(200).json({ message: "Deleted successfully", data });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
