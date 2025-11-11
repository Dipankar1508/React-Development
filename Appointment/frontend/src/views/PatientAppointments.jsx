import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Divider,
    Paper,
    Button,
    Stack
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const PatientAppointments = () => {
    const navigate = useNavigate();
    const { id: patientId } = useParams();

    const token = localStorage.getItem("token");
    const [appointments, setAppointments] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:7000/api/appointment/patient/${patientId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setAppointments(res.data.data || []);
            } catch (err) {
                setMessage(err.response?.data?.message || "Error fetching appointments");
            }
        };
        fetchAppointments();
    }, [patientId, token]);

    const handleNavigate = () => navigate("/patient/dashboard");

    // ✅ Separate by date
    const today = new Date().setHours(0, 0, 0, 0);

    const futureAppointments = appointments
        .filter(appt => new Date(appt.date).setHours(0, 0, 0, 0) >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const pastAppointments = appointments
        .filter(appt => new Date(appt.date).setHours(0, 0, 0, 0) < today)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    const AppointmentCard = ({ appt }) => (
        <Card
            sx={{
                mb: 3,
                bgcolor: "rgba(255,255,255,0.08)",
                borderRadius: 3,
                border: "1px solid rgba(255,255,255,0.12)",
                color: "white",
                p: 2
            }}
        >
            <CardContent>
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", md: "center" }}
                    spacing={1}
                    sx={{ mb: 1 }}
                >
                    <Typography sx={{ color: "#00ffc3", fontWeight: 600, fontSize: 18 }}>
                        🩺 Doctor: {appt.doctorId?.name}
                    </Typography>


                    <Typography sx={{ opacity: 0.9 }}>
                        📅 {new Date(appt.date).toLocaleDateString("en-GB")}
                    </Typography>

                    <Typography sx={{ opacity: 0.8 }}>
                        🩻 {appt.specialization}
                    </Typography>
                </Stack>

                <Divider sx={{ mb: 1, bgcolor: "rgba(255,255,255,0.2)" }} />

                <Typography sx={{ fontSize: 16 }}>
                    ⚙️ Status: <b>{appt.status}</b>
                </Typography>
            </CardContent>
        </Card>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#071021] via-[#0e2340] to-[#081224] text-white flex justify-center p-6 md:p-12">
            <Paper
                elevation={10}
                sx={{
                    width: "100%",
                    maxWidth: 850,
                    bgcolor: "rgba(255,255,255,0.05)",
                    borderRadius: 4,
                    p: 4,
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(8px)"
                }}
            >
                {/* Title + Back */}
                <Box
                    sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}
                >
                    <Typography variant="h4" sx={{ color: "#00e5ff", fontWeight: 700 }}>
                        📜 My Appointment History
                    </Typography>

                    <Button
                        variant="outlined"
                        onClick={handleNavigate}
                        sx={{
                            borderColor: "#00e5ff",
                            color: "#00e5ff",
                            "&:hover": { borderColor: "#00e5ff", bgcolor: "rgba(0,229,255,0.1)" }
                        }}
                    >
                        ← Back
                    </Button>
                </Box>

                {/* Future Appointments Section */}
                {futureAppointments.length > 0 && (
                    <>
                        <Typography variant="h5" sx={{ color: "#00ffc3", mb: 2 }}>
                            ⏳ Upcoming Appointments
                        </Typography>
                        {futureAppointments.map((appt) => (
                            <AppointmentCard key={appt._id} appt={appt} />
                        ))}
                        <Divider sx={{ my: 4, bgcolor: "rgba(255,255,255,0.3)" }} />
                    </>
                )}

                {/* Past Appointments Section */}
                {pastAppointments.length > 0 && (
                    <>
                        <Typography variant="h5" sx={{ color: "#e57373", mb: 2 }}>
                            🕒 Past Appointments
                        </Typography>
                        {pastAppointments.map((appt) => (
                            <AppointmentCard key={appt._id} appt={appt} />
                        ))}
                    </>
                )}

                {(futureAppointments.length === 0 && pastAppointments.length === 0) && (
                    <Typography sx={{ textAlign: "center", opacity: 0.75, fontSize: 18 }}>
                        {message || "No appointments found."}
                    </Typography>
                )}
            </Paper>
        </div>
    );
};

export default PatientAppointments;
