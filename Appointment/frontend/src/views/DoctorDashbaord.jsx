import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Typography, Paper, Box, Stack, Chip, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const url = "http://localhost:7000/api/doctor";
    const token = localStorage.getItem("token");

    const [formData, setFormData] = useState({
        name: "",
        specialization: "",
        experienceYears: "",
        consultationFee: "",
        availableDays: [],
        availableSlots: [],
    });

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const res = await axios.get(`${url}/data/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDoctor(res.data.data);
            } catch (err) {
                console.log("No existing doctor profile");
            } finally {
                setLoading(false);
            }
        };

        fetchDoctor();
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleFormNavigate = () => {
        navigate("/doctor/form", { state: { doctor } });
    };

    const handleEdit = (id) => {
        navigate(`/doctor/edit/${id}`)
    }


    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center text-white bg-[#0b1b30]">
                <h2>Loading...</h2>
            </div>
        );

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-[#071021] via-[#0e2340] to-[#081224] text-white gap-8 p-6 md:p-12">
            {/* LEFT SECTION */}
            <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left px-2 md:px-8 order-2">
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: "#00e5ff" }}>
                    Welcome to MediConnect Portal
                </Typography>

                <Typography sx={{ mb: 4, color: "rgba(200,230,255,0.85)", lineHeight: 1.7 }}>
                    Manage your doctor profile, update your consultation details, and track your
                    appointments easily. Keep your details updated to help patients find you quickly.
                </Typography>

                <Stack
                    spacing={2}
                    sx={{
                        width: "100%",
                        maxWidth: 320,
                        mx: { xs: "auto", md: 0, },
                    }}
                >
                    {doctor ? (
                        <>
                            <Button
                                variant="contained"
                                sx={{ bgcolor: "#00bcd4", color: "#fff" }}
                                onClick={() => handleEdit(doctor._id)}
                            >
                                Edit Profile
                            </Button>


                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    bgcolor: "#43a047",
                                    fontWeight: 600,
                                    "&:hover": { bgcolor: "#388e3c" },
                                }}
                            >
                                View Appointments
                            </Button>
                        </>
                    ) : (
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                bgcolor: "#1976d2",
                                fontWeight: 600,
                                "&:hover": { bgcolor: "#1565c0" },
                            }}
                            onClick={handleFormNavigate}
                        >
                            Fill Credentials
                        </Button>
                    )}

                    <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        onClick={handleLogout}
                        sx={{ fontWeight: 600 }}
                    >
                        Logout
                    </Button>
                </Stack>
            </div>

            {/* RIGHT SECTION (Doctor ID Card) */}
            <div className="w-full md:w-1/2 flex justify-center items-center mt-6 md:mt-0 order-1">
                <Paper
                    elevation={10}
                    sx={{
                        width: "100%",
                        maxWidth: 420,
                        bgcolor: "rgba(255,255,255,0.08)",
                        borderRadius: 5,
                        p: 4,
                        border: "1px solid rgba(255,255,255,0.1)",
                        backdropFilter: "blur(10px)",
                        textAlign: "center",
                        color: "#fff",
                        transition: "all 0.3s ease",
                        "&:hover": {
                            // transform: "translateY(-5px)",
                            boxShadow: "0 10px 35px rgba(0,0,0,0.3)",
                        },
                    }}
                >
                    {doctor ? (
                        <Box>
                            {/* Avatar */}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    mb: 2,
                                }}
                            >
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/387/387561.png"
                                    alt="Doctor Avatar"
                                    width={100}
                                    height={100}
                                    style={{
                                        borderRadius: "50%",
                                        border: "3px solid #00e5ff",
                                        backgroundColor: "#0b1b30",
                                    }}
                                />
                            </Box>

                            {/* Name and specialization */}
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: 700, color: "white", mb: 0.5 }}
                            >
                                Dr. {doctor.name}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2, opacity: 0.8, color: "white" }}>
                                {doctor.specialization}
                            </Typography>

                            {/* <Divider sx={{ bgcolor: "rgba(255,255,255,0.15)", my: 2 }} /> */}

                            {/* Experience and fee */}
                            <Box sx={{ textAlign: "center", mb: 2, pl: 1 }}>
                                <Typography sx={{ mb: 1 }}>
                                    <b>Experience:</b> {doctor.experienceYears} years
                                </Typography>
                                <Typography>
                                    <b>Consultation Fee:</b> ₹{doctor.consultationFee}
                                </Typography>
                            </Box>

                            <Divider sx={{ bgcolor: "rgba(255,255,255,0.15)", my: 2 }} />

                            {/* Available Days */}
                            <Typography
                                variant="subtitle1"
                                sx={{ mb: 1, color: "#00e5ff", fontWeight: 600 }}
                            >
                                Available Days
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                    gap: 1,
                                    mb: 2,
                                }}
                            >
                                {doctor.availableDays.map((day, i) => (
                                    <Chip
                                        key={i}
                                        label={day}
                                        sx={{
                                            bgcolor: "rgba(0,229,255,0.1)",
                                            color: "#00e5ff",
                                            border: "1px solid rgba(0,229,255,0.3)",
                                            fontSize: "0.8rem",
                                        }}
                                    />
                                ))}
                            </Box>

                            {/* Time Slots */}
                            {doctor.availableSlots?.length > 0 && (
                                <>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ mb: 1, color: "#00ffc3", fontWeight: 600, textAlign: "center" }}
                                    >
                                        Available Time Slots
                                    </Typography>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            justifyContent: "center",
                                            gap: 1.5,
                                        }}
                                    >
                                        {doctor.availableSlots.map((slot, index) => {
                                            // ✅ Convert to readable 12-hour time
                                            const formatTime = (timeString) => {
                                                const date = new Date(timeString);
                                                return date.toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: true,
                                                });
                                            };

                                            return (
                                                <Chip
                                                    key={index}
                                                    label={`${formatTime(slot.startTime)} - ${formatTime(slot.endTime)}`}
                                                    sx={{
                                                        bgcolor: "rgba(0,255,170,0.1)",
                                                        color: "#00ffc3",
                                                        border: "1px solid rgba(0,255,170,0.3)",
                                                        fontSize: "0.85rem",
                                                        fontWeight: 500,
                                                        px: 1.5,
                                                        py: 0.5,
                                                        borderRadius: "20px",
                                                        "&:hover": {
                                                            bgcolor: "rgba(0,255,170,0.2)",
                                                            transform: "scale(1.05)",
                                                            transition: "0.2s ease",
                                                        },
                                                    }}
                                                />
                                            );
                                        })}
                                    </Box>
                                </>
                            )}
                            <Divider sx={{ bgcolor: "rgba(255,255,255,0.15)", my: 2 }} />

                            {doctor.createdAt && (
                                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                                    Profile Created:{" "}
                                    {new Date(doctor.createdAt).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </Typography>

                            )}

                        </Box>
                    ) : (
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                No Profile Found
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: "rgba(200,230,255,0.85)" }}
                            >
                                Click “Fill Credentials” to create your doctor profile.
                            </Typography>
                        </Box>
                    )}
                </Paper>
            </div>

        </div>
    );
};

export default DoctorDashboard;
