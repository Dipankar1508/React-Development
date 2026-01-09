const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendOTP = require("../utils/sendOTP");

const router = express.Router();

router.post("/send-otp", async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);

    let user = await User.findOne({ email });
    if (!user) user = new User({ email });

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    await sendOTP(email, otp);
    res.json({ message: "OTP sent" });
});

router.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
        return res.status(400).json({ error: "Invalid OTP" });
    }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET
    );
    res.json({ token });
});

module.exports = router;
