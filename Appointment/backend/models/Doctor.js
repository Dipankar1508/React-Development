const express = require("express");
const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
});

const doctorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    name: {
        type: String,
        required: true,
        trim: true,

    },
    specialization: {
        type: String,
        enum: [
            "Cardiology",
            "Dermatology",
            "ENT",
            "Gastroenterology",
            "General Medicine",
            "Gynaecology",
            "Neurology",
            "Oncology",
            "Orthopaedics",
            "Ophthalmology",
            "Pulmonology",
            "Psychiatry",
            "Radiology",
            "Respiratory Medicine",
            "Urology",
            "Vascular Medicine",
            "Allergy",
        ],
        required: true
    },
    experienceYears: {
        type: Number,
        required: true,
        min: 0,
    },
    consultationFee: {
        type: Number,
        required: true,
        min: 0,
    },
    availableDays: {
        type: [String],
        enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ],
        required: true,
    },
    availableSlots: [slotSchema],

}, { timestamps: true });


module.exports = mongoose.model("Doctor", doctorSchema);    