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
import { useNavigate } from "react-router-dom";

const DoctorAppointments = () => {
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token");
    const doctorId = localStorage.getItem("doctorId");

    useEffect(() => {
        const fetchAppointments = async () => {
            if (!doctorId) {
                setMessage("Doctor ID not found. Please log in again.");
                return;
            }

            try {
                const res = await axios.get(
                    `http://localhost:7000/api/appointment/doctor/${doctorId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setAppointments(res.data.data || []);
            } catch (err) {
                setMessage(err.response?.data?.message || "Error fetching appointments");
            }
        };

        fetchAppointments();
    }, [doctorId, token]);

    // 🔹 Update Appointment Status
    const updateStatus = async (id, newStatus) => {
        try {
            await axios.put(
                `http://localhost:7000/api/appointment/update/${id}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setAppointments(prev =>
                prev.map(a => (a._id === id ? { ...a, status: newStatus } : a))
            );
        } catch (err) {
            console.log(err);
        }
    };

    const handleNavigate = () => navigate("/doctor/dashboard");

    // ----------------------------------------------------
    // ✅ Handle Upcoming and Past Using Date Only
    // ----------------------------------------------------
    const today = new Date().setHours(0, 0, 0, 0);

    const upcoming = appointments.filter((appt) => {
        const apptDate = new Date(appt.date).setHours(0, 0, 0, 0);
        return apptDate >= today && appt.status === "Pending";
    });

    const past = appointments.filter((appt) => {
        const apptDate = new Date(appt.date).setHours(0, 0, 0, 0);
        return apptDate < today || appt.status !== "Pending";
    });

    // ----------------------------------------------------
    // 🎨 Status Badge Colors
    // ----------------------------------------------------
    const getStatusColor = (status) => {
        switch (status) {
            case "Completed":
                return "#00c853"; // Green
            case "Cancelled":
                return "#ef5350"; // Red
            default:
                return "#ffd600"; // Yellow (Pending)
        }
    };

    // ----------------------------------------------------
    // Reusable Appointment Card Component
    // ----------------------------------------------------
    const AppointmentCard = ({ appt, showActions }) => (
        <Card sx={{
            mb: 3,
            bgcolor: "rgba(255,255,255,0.08)",
            borderRadius: 3,
            border: "1px solid rgba(255,255,255,0.12)",
            color: "white",
            p: 2
        }}>
            <CardContent>

                {/* Row 1 */}
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", md: "center" }}
                    spacing={1}
                    sx={{ mb: 2 }}
                >
                    <Typography sx={{ color: "#00ffc3", fontWeight: 600, fontSize: 18 }}>
                        Patient : {appt.patientName}
                    </Typography>

                    <Typography sx={{ opacity: 0.9 }}>
                        📅 {new Date(appt.date).toLocaleDateString("en-GB")}
                    </Typography>

                    <Typography sx={{ opacity: 0.8 }}>
                        🩻 {appt.specialization}
                    </Typography>
                </Stack>

                <Divider sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.2)" }} />

                {/* Row 2 */}
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", md: "center" }}
                    spacing={2}
                >

                    <Stack direction="row" alignItems="center" spacing={5}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography sx={{ fontSize: 15, opacity: 0.85 }}>
                                Status :
                            </Typography>

                            <Box
                                sx={{
                                    px: 1.5,
                                    py: 0.6,
                                    borderRadius: "10px",
                                    bgcolor: getStatusColor(appt.status),
                                    color: "#001b2e",
                                    fontWeight: 600,
                                    fontSize: 14,
                                    textTransform: "uppercase",
                                    minWidth: "90px",
                                    textAlign: "center"
                                }}
                            >
                                {appt.status}
                            </Box>
                        </Stack>


                        <select
                            value={appt.status}
                            onChange={(e) => updateStatus(appt._id, e.target.value)}
                            style={{
                                background: "#112233",
                                border: "1px solid rgba(255,255,255,0.25)",
                                padding: "6px 10px",
                                borderRadius: "8px",
                                color: "white",
                                cursor: "pointer"
                            }}
                        >
                            {appt.status === "Pending" && <>
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </>}

                            {appt.status === "Completed" && <>
                                <option value="Completed">Completed</option>
                                <option value="Pending">Pending</option>
                            </>}

                            {appt.status === "Cancelled" && <>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Pending">Pending</option>
                            </>}
                        </select>
                    </Stack>
                </Stack>

            </CardContent>
        </Card>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#081224] via-[#0b2740] to-[#081224] text-white flex justify-center p-6 md:p-12">
            <Paper
                elevation={10}
                sx={{
                    width: "100%",
                    maxWidth: 850,
                    bgcolor: "rgba(255,255,255,0.05)",
                    borderRadius: 4,
                    p: 4,
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(8px)",
                }}
            >

                {/* Header */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                    <Typography variant="h4" sx={{ color: "#00d4ff", fontWeight: 700 }}>
                        🩺 My Scheduled Appointments
                    </Typography>

                    <Button
                        variant="outlined"
                        onClick={handleNavigate}
                        sx={{
                            borderColor: "#00d4ff",
                            color: "#00d4ff",
                            "&:hover": { borderColor: "#00d4ff", bgcolor: "rgba(0,212,255,0.1)" }
                        }}
                    >
                        ← Back
                    </Button>
                </Box>


                {/* Upcoming Section */}
                <Typography variant="h5" sx={{ color: "#00e5ff", mb: 2 }}>
                    ⏳ Upcoming Appointments
                </Typography>
                {upcoming.length > 0 ? upcoming.map((appt) => (
                    <AppointmentCard key={appt._id} appt={appt} showActions />
                )) : (
                    <Typography sx={{ opacity: 0.7, mb: 3 }}>No upcoming appointments.</Typography>
                )}

                <Divider sx={{ my: 3, bgcolor: "rgba(255,255,255,0.25)" }} />

                {/* Past Section */}
                <Typography variant="h5" sx={{ color: "#00e5ff", mb: 2 }}>
                    📜 Past Appointments
                </Typography>
                {past.length > 0 ? past.map((appt) => (
                    <AppointmentCard key={appt._id} appt={appt} showActions={false} />
                )) : (
                    <Typography sx={{ opacity: 0.7 }}>No past appointments.</Typography>
                )}

            </Paper>
        </div>
    );
};

export default DoctorAppointments;
