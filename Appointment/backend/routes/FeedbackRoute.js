const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

router.post('/postfeedback', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        if (!name || !email || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newFeedback = new Feedback({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            message: message.trim(),
        });
        await newFeedback.save();
        res.status(200).json({ message: 'Feedback submitted' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting feedback' });
    }
});

router.get('/watchfeedback', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const feedback = await Feedback.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Feedback.countDocuments();

        res.status(200).json({
            total,
            page,
            pages: Math.ceil(total / limit),
            feedback,
        });
    } catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).json({ message: "Error fetching feedback" });
    }
});


module.exports = router;