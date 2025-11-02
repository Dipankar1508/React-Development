const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: true
    },
    hasChronicDiseases: {
        type: Boolean,
        default: false
    },
    chronicDiseases: {
        type: String,
        trim: true,
        default: ""
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
