const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
    },
    patientName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    slotTime: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Pending',
    },
},
    { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);