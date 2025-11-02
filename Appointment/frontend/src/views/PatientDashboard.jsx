import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Typography, Paper, Box, Stack, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const url = "http://localhost:7000/api/patient";
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const res = await axios.get(`${url}/data/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPatient(res.data.data);
                console.log("Patient Profile:", res.data.data);
            } catch (err) {
                console.log("No existing patient profile");
            } finally {
                setLoading(false);
            }
        };
        fetchPatient();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleFormNavigate = () => {
        navigate("/patient/form", { state: { patient } });
    };

    const handleEdit = (id) => {
        navigate(`/patient/edit/${id}`);
    };

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
                    Manage your patient profile, update your personal details, and book appointments with doctors seamlessly.
                </Typography>

                <Stack
                    spacing={2}
                    sx={{
                        width: "100%",
                        maxWidth: 320,
                        mx: { xs: "auto", md: 0 },
                    }}
                >
                    {patient ? (
                        <>
                            <Button
                                variant="contained"
                                sx={{ bgcolor: "#00bcd4", color: "#fff" }}
                                onClick={() => handleEdit(patient._id)}
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
                                onClick={() => navigate("/appointments")}
                            >
                                Book Appointments
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    bgcolor: "#43a047",
                                    fontWeight: 600,
                                    "&:hover": { bgcolor: "#388e3c" },
                                }}
                                onClick={() => navigate("/appointments")}
                            >
                                History
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
                            Fill Details
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

            {/* RIGHT SECTION (Patient Info Card) */}
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
                            boxShadow: "0 10px 35px rgba(0,0,0,0.3)",
                        },
                    }}
                >
                    {patient ? (
                        <Box>
                            {/* Avatar */}
                            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                                <img
                                    src={
                                        patient.gender === "Male"
                                            ? "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                                            : "https://cdn-icons-png.flaticon.com/512/4140/4140037.png"

                                    }
                                    alt="Patient Avatar"
                                    width={100}
                                    height={100}
                                    style={{
                                        borderRadius: "50%",
                                        border: "3px solid #00e5ff",
                                        backgroundColor: "#0b1b30",
                                    }}
                                />
                            </Box>

                            {/* Basic Info */}
                            <Typography variant="h6" sx={{ fontWeight: 700, color: "white", mb: 0.5 }}>
                                {patient.name}
                            </Typography>

                            <Typography variant="body1" sx={{ mb: 2, opacity: 0.8 }}>
                                Gender: {patient.gender}
                            </Typography>

                            <Divider sx={{ bgcolor: "rgba(255,255,255,0.15)", my: 2 }} />

                            {/* Additional Info */}
                            <Box sx={{ textAlign: "left", px: 1 }}>
                                <Typography sx={{ mb: 1 }}>
                                    <b>Age:</b> {patient.age}
                                </Typography>
                                <Typography sx={{ mb: 1 }}>
                                    <b>Phone:</b> {patient.phone}
                                </Typography>
                                <Typography sx={{ mb: 1 }}>
                                    <b>Blood Group:</b> {patient.bloodGroup}
                                </Typography>
                                <Typography sx={{ mb: 1 }}>
                                    <b>Chronic Diseases:</b> {patient.hasChronicDiseases ? "Yes" : "No"}
                                </Typography>
                                {patient.hasChronicDiseases && (
                                    <Typography sx={{ mb: 1 }}>
                                        <b>Disease Details:</b> {patient.chronicDiseases || "Not specified"}
                                    </Typography>
                                )}
                                <Typography sx={{ mb: 1 }}>
                                    <b>Address:</b> {patient.address}
                                </Typography>
                            </Box>

                            <Divider sx={{ bgcolor: "rgba(255,255,255,0.15)", my: 2 }} />

                            {/* Created Info */}
                            <Typography variant="body2" sx={{ opacity: 0.7 }}>
                                Profile Created: {new Date(patient.createdAt).toLocaleDateString()}
                            </Typography>
                        </Box>
                    ) : (
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                No Profile Found
                            </Typography>
                            <Typography variant="body2" sx={{ color: "rgba(200,230,255,0.85)" }}>
                                Click “Fill Details” to create your patient profile.
                            </Typography>
                        </Box>
                    )}
                </Paper>
            </div>

        </div>
    );
};

export default PatientDashboard;
