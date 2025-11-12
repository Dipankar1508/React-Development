const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();


const Appointment = require("./routes/AppointmentRoute.js")
const Doctor = require("./routes/DoctorRoute.js")
const Patient = require("./routes/PatientRoute.js")
const Auth = require("./routes/AuthRoute.js")
const Admin = require("./routes/AdminRoute.js")
const Feedback = require("./routes/FeedbackRoute.js")


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/appointment", Appointment);
app.use("/api/doctor", Doctor);
app.use("/api/patient", Patient);
app.use("/api/auth", Auth);
app.use("/api/admin", Admin);
app.use("/api/feedback", Feedback);


mongoose
    .connect("mongodb://localhost:27017/Appointment")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));


app.listen(7000, () => {
    console.log("http://localhost:7000");
});