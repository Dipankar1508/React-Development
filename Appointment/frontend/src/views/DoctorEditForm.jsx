import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
    TextField,
    MenuItem,
    Button,
    Checkbox,
    FormControlLabel,
    Box,
    IconButton,
    Stack,
    Typography,
    Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "../Components/Toast"

const specializations = [
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
];

const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

const DoctorEditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const url = "http://localhost:7000/api/doctor";

    const [formData, setFormData] = useState({
        name: "",
        specialization: "",
        experienceYears: "",
        consultationFee: "",
        availableDays: [],
        availableSlots: [],
    });
    const [loading, setLoading] = useState(false);
    const [editing] = useState(false);
    const [message, setMessage] = useState("");
    const [token, setToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) setToken(token);

        const fetchDoctor = async () => {
            try {
                const res = await axios.get(`${url}/data/edit/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const fetchedData = res.data.data;

                // ✅ Convert slot times to "HH:mm" safely, even if they are Date strings or empty
                const formattedSlots = (fetchedData.availableSlots || []).map(slot => {
                    const start = new Date(slot.startTime);
                    const end = new Date(slot.endTime);

                    // extract only HH:mm part safely
                    const startTime = isNaN(start.getTime())
                        ? slot.startTime?.slice(0, 5) || ""
                        : start.toISOString().substring(11, 16);
                    const endTime = isNaN(end.getTime())
                        ? slot.endTime?.slice(0, 5) || ""
                        : end.toISOString().substring(11, 16);

                    return { startTime, endTime };
                });

                setFormData({
                    ...fetchedData,
                    availableSlots: formattedSlots,
                });
            } catch (err) {
                console.error("Error fetching doctor:", err);
            }
        };

        if (id) fetchDoctor();
    }, [id]);


    // Input handlers

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDaysChange = (day) => {
        setFormData((prev) => ({
            ...prev,
            availableDays: prev.availableDays.includes(day)
                ? prev.availableDays.filter((d) => d !== day)
                : [...prev.availableDays, day],
        }));
    };

    const addSlot = () => {
        setFormData((prev) => ({
            ...prev,
            availableSlots: [...prev.availableSlots, { startTime: "", endTime: "" }],
        }));
    };

    const handleSlotChange = (index, field, value) => {
        const updated = [...formData.availableSlots];
        updated[index][field] = value;
        setFormData((prev) => ({ ...prev, availableSlots: updated }));
    };

    const removeSlot = (index) => {
        const updated = formData.availableSlots.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, availableSlots: updated }));
    };

    // Submit form

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const updatedSlots = formData.availableSlots.map(slot => ({
                startTime: new Date(`1970-01-01T${slot.startTime}:00Z`),
                endTime: new Date(`1970-01-01T${slot.endTime}:00Z`)
            }));

            const updatedForm = {
                ...formData,
                availableSlots: updatedSlots
            };

            setFormData(updatedForm);
            await axios.put(`${url}/data/edit/${id}`, updatedForm, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast("Doctor profile updated successfully.");
            setTimeout(() => { navigate("/doctor/dashboard") }, 500);
        } catch (err) {
            console.error(err);
            setMessage(
                err.response?.data?.message || "Failed to Update profile. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };


    const handleNavigate = () => {
        navigate("/doctor/dashboard")
    }

    // ----------------------------
    // JSX Layout
    // ----------------------------

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#081224] via-[#0b2740] to-[#081224] text-white flex justify-center items-center p-8">
            <Paper
                elevation={10}
                sx={{
                    width: "100%",
                    maxWidth: 600,
                    bgcolor: "rgba(255,255,255,0.04)",
                    borderRadius: 4,
                    p: 5,
                    border: "1px solid rgba(255,255,255,0.06)",
                    backdropFilter: "blur(6px)",
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        color: "#00d4ff",
                        mb: 3,
                        textAlign: "center",
                        fontWeight: 700,
                    }}
                >
                    {editing ? "Edit Doctor Profile" : "Create Doctor Profile"}
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        {/* Doctor Name */}
                        <TextField
                            variant="filled"
                            label="Doctor Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            sx={{
                                bgcolor: "rgba(0,0,0,0.45)",
                                borderRadius: 2,
                                input: { color: "white" },
                                "& .MuiInputLabel-root": { color: "rgba(173, 216, 230, 0.9)" },
                                "& .MuiInputLabel-root.Mui-focused": { color: "#00d4ff" },
                            }}
                        />

                        {/* Specialization */}
                        <TextField
                            select
                            variant="filled"
                            label="Select Specialization"
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleChange}
                            fullWidth
                            sx={{
                                bgcolor: "rgba(0,0,0,0.45)",
                                borderRadius: 2,
                                "& .MuiInputBase-input": { color: "white" }, // ✅ makes selected text white
                                "& .MuiSelect-select": { color: "white" }, // ✅ specifically targets select text
                                "& .MuiInputLabel-root": { color: "rgba(173, 216, 230, 0.9)" },
                                "& .MuiInputLabel-root.Mui-focused": { color: "#00d4ff" },
                                "& .MuiSvgIcon-root": { color: "white" }, // optional: makes the dropdown arrow white
                            }}
                        >
                            <MenuItem value="">Select Specialization</MenuItem>
                            {specializations.map((spec) => (
                                <MenuItem key={spec} value={spec}>
                                    {spec}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/* Experience */}
                        <TextField
                            variant="filled"
                            label="Experience (Years)"
                            name="experienceYears"
                            type="number"
                            value={formData.experienceYears}
                            onChange={handleChange}
                            fullWidth
                            sx={{
                                bgcolor: "rgba(0,0,0,0.45)",
                                borderRadius: 2,
                                input: { color: "white" },
                                "& .MuiInputLabel-root": { color: "rgba(173, 216, 230, 0.9)" },
                                "& .MuiInputLabel-root.Mui-focused": { color: "#00d4ff" },
                            }}
                        />

                        {/* Fee */}
                        <TextField
                            variant="filled"
                            label="Consultation Fee"
                            name="consultationFee"
                            type="number"
                            value={formData.consultationFee}
                            onChange={handleChange}
                            fullWidth
                            sx={{
                                bgcolor: "rgba(0,0,0,0.45)",
                                borderRadius: 2,
                                input: { color: "white" },
                                "& .MuiInputLabel-root": { color: "rgba(173, 216, 230, 0.9)" },
                                "& .MuiInputLabel-root.Mui-focused": { color: "#00d4ff" },
                            }}
                        />

                        {/* Available Days */}
                        <Box>
                            <Typography
                                sx={{ color: "#8eeaf2", mb: 1, fontWeight: 600 }}
                            >
                                Available Days
                            </Typography>
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                {daysOfWeek.map((day) => (
                                    <FormControlLabel
                                        key={day}
                                        control={
                                            <Checkbox
                                                checked={formData.availableDays.includes(day)}
                                                onChange={() => handleDaysChange(day)}
                                                sx={{
                                                    color: "#00d4ff",
                                                    "&.Mui-checked": { color: "#00d4ff" },
                                                }}
                                            />
                                        }
                                        label={
                                            <span
                                                style={{ color: "rgba(255,255,255,0.9)", fontSize: 14 }}
                                            >
                                                {day}
                                            </span>
                                        }
                                    />
                                ))}
                            </Box>
                        </Box>

                        {/* Slots */}
                        <Box>
                            <Typography
                                sx={{ color: "#8eeaf2", mb: 1, fontWeight: 600 }}
                            >
                                Available Slots
                            </Typography>

                            <Stack spacing={2}>
                                {formData.availableSlots.map((slot, index) => (
                                    <Box
                                        key={index}
                                        sx={{ display: "flex", gap: 1, alignItems: "center" }}
                                    >
                                        <TextField
                                            variant="filled"
                                            type="time"
                                            value={slot.startTime}
                                            onChange={(e) =>
                                                handleSlotChange(index, "startTime", e.target.value)
                                            }
                                            InputLabelProps={{ shrink: true }}

                                            sx={{
                                                bgcolor: "rgba(0,0,0,0.45)",
                                                borderRadius: 2,
                                                input: { color: "white" },
                                                width: "50%",
                                            }}
                                        />
                                        <TextField
                                            variant="filled"
                                            type="time"
                                            value={slot.endTime}
                                            onChange={(e) =>
                                                handleSlotChange(index, "endTime", e.target.value)
                                            }
                                            InputLabelProps={{ shrink: true }}

                                            sx={{
                                                bgcolor: "rgba(0,0,0,0.45)",
                                                borderRadius: 2,
                                                input: { color: "white" },
                                                width: "50%",
                                            }}
                                        />
                                        <IconButton
                                            onClick={() => removeSlot(index)}
                                            sx={{ color: "#ff6b6b" }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                ))}

                                <Button
                                    variant="contained"
                                    onClick={addSlot}
                                    sx={{
                                        bgcolor: "#00c853",
                                        "&:hover": { bgcolor: "#00b44a" },
                                    }}
                                >
                                    + Add Slot
                                </Button>
                            </Stack>
                        </Box>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={loading}
                            sx={{
                                bgcolor: "#00bcd4",
                                "&:hover": { bgcolor: "#00a0b8" },
                                py: 1.8,
                                fontWeight: 700,
                            }}
                        >
                            {loading ? "Updating..." : "Update Profile"}
                        </Button>

                        {/* Message */}
                        {message && (
                            <Typography align="center" sx={{ color: "#7ef9f3", fontWeight: 600 }}>
                                {message}
                            </Typography>
                        )}

                        {/* Logout */}
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleNavigate}
                            sx={{
                                bgcolor: "#ef5350",
                                "&:hover": { bgcolor: "#e53935" },
                            }}
                        >
                            Back
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </div>
    );
};

export default DoctorEditForm;
