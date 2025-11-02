const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["doctor", "patient"], required: true },
    doctorPin: {
        type: String,
        required: function () {
            return this.role === "doctor"; // only doctors require pin
        },
    },
    token: { type: String },
    tokenCreatedAt: { type: Date },
});

// ✅ Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// ✅ Compare password during login
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// ✅ Validate Doctor PIN (admin-controlled)
userSchema.statics.validateDoctorPin = async function (enteredPin) {
    const AdminDoctorPIN = process.env.DOCTOR_PIN || "12345"; // use .env
    return enteredPin === AdminDoctorPIN;
};

// ✅ Generate random token (for login/session)
userSchema.methods.generateToken = function () {
    this.token = crypto.randomBytes(20).toString("hex");
    this.tokenCreatedAt = new Date();
    return this.token;
};

// ✅ Check if token is expired (24 hours validity)
userSchema.methods.isTokenExpired = function () {
    if (!this.tokenCreatedAt) return true;
    const oneDay = 24 * 60 * 60 * 1000;
    return Date.now() - this.tokenCreatedAt.getTime() > oneDay;
};

// ✅ Cascade delete Doctor/Patient when User is deleted
userSchema.post("findOneAndDelete", async function (doc) {
    if (!doc) return;

    try {
        if (doc.role === "doctor") {
            await Doctor.findOneAndDelete({ userId: doc._id });
            console.log(`Deleted doctor profile for user ${doc._id}`);
        } else if (doc.role === "patient") {
            await Patient.findOneAndDelete({ userId: doc._id });
            console.log(`Deleted patient profile for user ${doc._id}`);
        }
    } catch (err) {
        console.error("Cascade delete error:", err);
    }
});

module.exports = mongoose.model("User", userSchema);
