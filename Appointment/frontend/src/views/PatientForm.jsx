import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    TextField,
    MenuItem,
    Button,
    Checkbox,
    FormControlLabel,
    Box,
    Stack,
    Typography,
    Paper,
    Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const bloodGroups = ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"];
const genders = ["Male", "Female", "Other"];

const PatientForm = () => {
    const navigate = useNavigate();
    const url = "http://localhost:7000/api/patient/data";

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        phone: "",
        address: "",
        bloodGroup: "",
        hasChronicDiseases: false,
        chronicDiseases: "",
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("Local Storage Token:", token);
        if (token) setToken(token);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckbox = (e) => {
        setFormData((prev) => ({
            ...prev,
            hasChronicDiseases: e.target.checked,
            chronicDiseases: e.target.checked ? prev.chronicDiseases : "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(url, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage(response.data.message || "Patient profile created successfully!");
            setFormData({
                name: "",
                age: "",
                gender: "",
                phone: "",
                address: "",
                bloodGroup: "",
                hasChronicDiseases: false,
                chronicDiseases: "",
            });
        } catch (error) {
            console.error(error);
            setMessage(error.response?.data?.message || "Failed to create patient profile.");
        } finally {
            setLoading(false);
        }
    };

    const handleNavigate = () => navigate("/patient/dashboard");

    // -----------------------------------
    // JSX Layout (Light-themed)
    // -----------------------------------
    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#e9f7ff] via-[#f5fbff] to-[#e9f7ff] p-8">
            <Paper
                elevation={8}
                sx={{
                    width: "100%",
                    maxWidth: 650,
                    borderRadius: 4,
                    p: 5,
                    background: "rgba(255,255,255,0.8)",
                    border: "1px solid rgba(0,0,0,0.08)",
                    backdropFilter: "blur(8px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    sx={{
                        color: "#00838f",
                        fontWeight: 700,
                        mb: 3,
                        textShadow: "0 0 8px rgba(0,131,143,0.1)",
                    }}
                >
                    Create Patient Profile
                </Typography>

                <Divider sx={{ mb: 3, borderColor: "rgba(0,0,0,0.1)" }} />

                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        {/* Row 1 */}
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                sx={{
                                    bgcolor: "#f9f9f9",
                                    borderRadius: 2,
                                }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Age"
                                name="age"
                                type="number"
                                value={formData.age}
                                onChange={handleChange}
                                sx={{
                                    bgcolor: "#f9f9f9",
                                    borderRadius: 2,
                                }}
                            />
                        </Box>

                        {/* Row 2 */}
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <TextField
                                select
                                fullWidth
                                variant="outlined"
                                label="Gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                sx={{
                                    bgcolor: "#f9f9f9",
                                    borderRadius: 2,
                                }}
                            >
                                <MenuItem value="">Select Gender</MenuItem>
                                {genders.map((g) => (
                                    <MenuItem key={g} value={g}>
                                        {g}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                select
                                fullWidth
                                variant="outlined"
                                label="Blood Group"
                                name="bloodGroup"
                                value={formData.bloodGroup}
                                onChange={handleChange}
                                sx={{
                                    bgcolor: "#f9f9f9",
                                    borderRadius: 2,
                                }}
                            >
                                <MenuItem value="">Select Blood Group</MenuItem>
                                {bloodGroups.map((b) => (
                                    <MenuItem key={b} value={b}>
                                        {b}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>

                        {/* Row 3 */}
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Contact Number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            sx={{
                                bgcolor: "#f9f9f9",
                                borderRadius: 2,
                            }}
                        />

                        {/* Row 4 */}
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            variant="outlined"
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            sx={{
                                bgcolor: "#f9f9f9",
                                borderRadius: 2,
                            }}
                        />

                        {/* Row 5 */}
                        <Box>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.hasChronicDiseases}
                                        onChange={handleCheckbox}
                                        sx={{
                                            color: "#0097a7",
                                            "&.Mui-checked": { color: "#00838f" },
                                        }}
                                    />
                                }
                                label={
                                    <span style={{ color: "#333", fontWeight: 500 }}>
                                        Any chronic diseases?
                                    </span>
                                }
                            />
                            {formData.hasChronicDiseases && (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="List Chronic Diseases"
                                    name="chronicDiseases"
                                    value={formData.chronicDiseases}
                                    onChange={handleChange}
                                    sx={{
                                        bgcolor: "#f9f9f9",
                                        borderRadius: 2,
                                        mt: 1,
                                    }}
                                />
                            )}
                        </Box>

                        {/* Submit */}
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={loading}
                            sx={{
                                bgcolor: "#00838f",
                                "&:hover": { bgcolor: "#006978" },
                                color: "#fff",
                                fontWeight: 700,
                                py: 1.4,
                                borderRadius: 2,
                            }}
                        >
                            {loading ? "Saving..." : "Create Profile"}
                        </Button>

                        {/* Message */}
                        {message && (
                            <Typography
                                align="center"
                                sx={{ color: "#006978", fontWeight: 600 }}
                            >
                                {message}
                            </Typography>
                        )}

                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleNavigate}
                            sx={{
                                borderColor: "#ff6b6b",
                                color: "#ff6b6b",
                                "&:hover": {
                                    borderColor: "#d32f2f",
                                    bgcolor: "rgba(255,0,0,0.05)",
                                },
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

export default PatientForm;
