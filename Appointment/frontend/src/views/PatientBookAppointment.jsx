import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    TextField,
    Button,
    Box,
    Typography,
    Autocomplete,
    Card,
    CardContent,
    MenuItem,
    Divider,
    Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "../Components/Toast"

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        // if already loaded, don't load again
        if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
            return resolve(true);
        }

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};


const PatientBookAppointment = () => {
    const navigate = useNavigate();

    const [specializations, setSpecializations] = useState([]);
    const [specialization, setSpecialization] = useState("");
    const [doctorOptions, setDoctorOptions] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [availableDates, setAvailableDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);


    const token = localStorage.getItem("token");

    useEffect(() => {
        axios
            .get("http://localhost:7000/api/doctor/specializations/list")
            .then((res) => setSpecializations(res.data.data))
            .catch(() => setSpecializations([]));
    }, []);

    const handleSpecializationChange = async (value) => {
        setSpecialization(value);
        setSelectedDoctor(null);
        setAvailableDates([]);
        setSelectedDate("");

        try {
            const res = await axios.get(
                `http://localhost:7000/api/doctor/by-specialization?spec=${value}`
            );
            setDoctorOptions(res.data.data);
        } catch {
            setDoctorOptions([]);
        }
    };

    const handleDoctorSelect = (doctor) => {
        setSelectedDoctor(doctor);

        const today = new Date();
        const upcoming = [];
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(today.getDate() + i);

            // ✅ Match backend weekday calculation EXACTLY
            const weekday = weekdays[new Date(d.toISOString().split("T")[0] + "T00:00:00").getDay()];

            if (doctor.availableDays.includes(weekday)) {
                upcoming.push({
                    date: d.toISOString().split("T")[0],
                    weekday,
                });
            }
        }

        setAvailableDates(upcoming);
    };

    const handleBook = async () => {
        if (!selectedDoctor || !selectedDate) {
            return toast("Please select doctor and date", "error");
        }
        console.log(selectedDoctor);
        setLoading(true);
        if (!token) {
            toast("Please login again", "error");
            navigate("/login");
            return;
        }

        // 1️⃣ load Razorpay script
        const loaded = await loadRazorpayScript();
        if (!loaded) {
            return toast("Failed to load payment gateway", "error");
        }

        try {
            // 2️⃣ ask backend to create Razorpay order
            const { data } = await axios.post(
                "http://localhost:7000/api/payment/create-order",
                {
                    amount: selectedDoctor.consultationFee || selectedDoctor.fee
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const options = {
                key: data.keyId,          // Razorpay key_id (TEST key for now)
                amount: data.amount,      // in paise
                currency: data.currency,  // "INR"
                order_id: data.orderId,

                name: "Doctor Appointment",
                description: `Consultation with Dr. ${selectedDoctor.name}`,
                theme: {
                    color: "#00e5ff",
                },
                handler: async function (response) {
                    // 3️⃣ payment successful → now book appointment
                    try {
                        await axios.post(
                            `http://localhost:7000/api/appointment/book/${selectedDoctor._id}`,
                            { date: selectedDate },
                            { headers: { Authorization: `Bearer ${token}` } }
                        );

                        toast("Appointment booked successfully", "success");
                        setTimeout(() => navigate("/patient/dashboard"), 1200);
                    } catch (err) {
                        console.error(err);
                        toast(
                            err.response?.data?.message ||
                            "Payment successful but booking failed. Contact support.",
                            "error"
                        );
                    }
                },
                modal: {
                    ondismiss: function () {
                        toast("Payment cancelled", "error");
                    },
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error(err);
            toast(
                err.response?.data?.message || "Error initiating payment",
                "error"
            );
        }
        finally {
            setLoading(false);
        }
    };


    const handleNavigate = () => {
        navigate("/patient/dashboard");
    };

    return (
        <div className="min-h-screen flex justify-center items-start p-6 md:p-12 bg-gradient-to-br from-[#081224] via-[#0b2740] to-[#081224] text-white">

            <Paper
                elevation={10}
                sx={{
                    width: "100%",
                    maxWidth: 500,
                    bgcolor: "rgba(255,255,255,0.08)",
                    borderRadius: 4,
                    p: 4,
                    border: "1px solid rgba(255,255,255,0.12)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
                    textAlign: "left",
                    color: "white",
                }}
            >
                <Typography
                    variant="h5"
                    sx={{ mb: 3, color: "#00e5ff", fontWeight: 700 }}
                >
                    🩺 Book Appointment
                </Typography>

                {/* Specialization Dropdown */}
                <TextField
                    select
                    fullWidth
                    label="Select Specialization"
                    value={specialization}
                    onChange={(e) => handleSpecializationChange(e.target.value)}
                    margin="normal"
                    sx={{
                        bgcolor: "#102a43",
                        borderRadius: 1,
                        "& .MuiInputBase-input": { color: "white" },
                        "& .MuiInputLabel-root": { color: "#b3cde0" },
                    }}
                >
                    {specializations.map((spec, index) => (
                        <MenuItem key={index} value={spec}>
                            {spec}
                        </MenuItem>
                    ))}
                </TextField>

                {/* Doctor Autocomplete */}
                <Autocomplete
                    options={doctorOptions}
                    getOptionLabel={(doc) => doc.name}
                    value={selectedDoctor}
                    onChange={(e, value) => {
                        setSelectedDoctor(value);

                        // If cleared → hide available date section
                        if (!value) {
                            setAvailableDates([]);
                            setSelectedDate("");
                            return;
                        }

                        // If doctor selected → recalculate available dates
                        handleDoctorSelect(value);
                    }}
                    disabled={!specialization}
                    clearOnEscape
                    sx={{ mt: 2 }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Choose Doctor"
                            fullWidth
                            sx={{
                                bgcolor: "#102a43",
                                borderRadius: 1,
                                "& .MuiInputBase-input": { color: "white" },
                                "& .MuiInputLabel-root": { color: "#b3cde0" },
                            }}
                        />
                    )}
                />


                {/* Available Dates */}
                {availableDates.length > 0 && (
                    <Card
                        sx={{
                            mt: 3,
                            p: 2,
                            bgcolor: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            borderRadius: 3,
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6" sx={{ color: "#00ffc6", mb: 1 }}>
                                📅 Available Dates (Next 7 Days)
                            </Typography>

                            <Divider sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.2)" }} />

                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                {availableDates.map((d) => (
                                    <Button
                                        key={d.date}
                                        variant={selectedDate === d.date ? "contained" : "outlined"}
                                        onClick={() => setSelectedDate(d.date)}
                                        sx={{
                                            borderRadius: "20px",
                                            textTransform: "none",
                                            px: 2.5,
                                            borderColor: "#00ffc6",
                                            color: "white",
                                            "&.Mui-contained": { bgcolor: "#00ffc6", color: "#003135" }
                                        }}
                                    >
                                        {d.weekday} ({d.date})
                                    </Button>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                )}

                {/* Book Button */}
                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        mt: 3,
                        py: 1.3,
                        bgcolor: "#00e5ff",
                        color: "#001b2e",
                        fontWeight: 700,
                        "&:hover": { bgcolor: "#00bcd4" },
                    }}
                    onClick={handleBook}
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Confirm Appointment"}
                </Button>


                <Button
                    fullWidth
                    sx={{
                        mt: 2,
                        py: 1.2,
                        bgcolor: "#ef5350",
                        color: "#fff",
                        fontWeight: 600,
                        "&:hover": { bgcolor: "#e53935" },
                    }}
                    onClick={handleNavigate}
                >
                    Back
                </Button>

                {message && (
                    <Typography sx={{ mt: 3, textAlign: "center", fontWeight: 600 }}>
                        {message}
                    </Typography>
                )}
            </Paper>
        </div>
    );

};

export default PatientBookAppointment;
