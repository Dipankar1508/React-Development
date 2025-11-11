const express = require('express');
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require('bcrypt');

// few main logics are directly handled in the models/User.js file

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role, doctorPin } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Validate doctor pin if role is doctor
        if (role === "doctor") {
            const isValid = await User.validateDoctorPin(doctorPin);
            if (!isValid) {
                return res.status(400).json({ message: "Invalid Doctor Pin" });
            }
        }

        // ✅ Only include doctorPin for doctors
        const userData = { name, email, password, role };
        if (role === "doctor") userData.doctorPin = doctorPin;

        const newUser = new User(userData);
        const token = newUser.generateToken();
        await newUser.save();

        console.log("New User Token:", token);


        res.status(201).json({
            message: "User registered successfully",
            user: { name: newUser.name, email: newUser.email, role: newUser.role },
            token: token,
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email }); 
        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isMatch = await existingUser.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if (existingUser.isTokenExpired()) {
            existingUser.generateToken();
            await existingUser.save();
        }

        console.log("User logged in:", existingUser.email);
        console.log("Existing User Token:", existingUser.token);

        res.status(200).json({
            message: "User logged in successfully",
            user: { name: existingUser.name, email: existingUser.email, role: existingUser.role },
            token: existingUser.token,
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/logout", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        user.token = null;
        user.tokenCreatedAt = null;
        await user.save();

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

module.exports = router;


/*
patient login
{
  "name": "Ravi Kumar",
  "email": "ravi@example.com",
  "password": "ravi123",
  "role": "patient"
}
  {
email : abc@gmail.com
passowrd : 963
}

Dcotor Login

*/