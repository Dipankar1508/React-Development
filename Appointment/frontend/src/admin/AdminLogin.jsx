import React, { useState } from "react";
import axios from "axios";
import { API_BASE } from "./api";
import {
    Box, Paper, TextField, Button, Typography, Stack
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "../Components/Toast"

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        setMsg("");
        try {
            const res = await axios.post(`${API_BASE}/login`, { email, password });
            localStorage.setItem("adminToken", res.data.token);
            // setMsg("✅ Login successful");
            toast(res.data.message);
            navigate("/admin/dashboard");
        } catch (err) {
            setMsg(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen bg-[#0b1b30] flex items-center justify-center p-6">
            <Paper
                elevation={10}
                sx={{
                    width: "100%", maxWidth: 420, p: 4, borderRadius: 4,
                    bgcolor: "rgba(255,255,255,0.06)", color: "white",
                    border: "1px solid rgba(255,255,255,0.12)",
                    backdropFilter: "blur(8px)",
                }}
            >
                <Typography variant="h4" sx={{ color: "#00e5ff", fontWeight: 700, mb: 2 }}>
                    Admin Login
                </Typography>

                <form onSubmit={onSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            label="Email" type="email" value={email}
                            onChange={(e) => setEmail(e.target.value)} fullWidth
                            sx={{ "& .MuiInputBase-root": { color: "white" }, "& .MuiInputLabel-root": { color: "#b3cde0" } }}
                        />
                        <TextField
                            label="Password" type="password" value={password}
                            onChange={(e) => setPassword(e.target.value)} fullWidth
                            sx={{ "& .MuiInputBase-root": { color: "white" }, "& .MuiInputLabel-root": { color: "#b3cde0" } }}
                        />
                        <Button type="submit" variant="contained" sx={{ bgcolor: "#00e5ff", color: "#001b2e", fontWeight: 700 }}>
                            Login
                        </Button>
                    </Stack>
                </form>

                {msg && <Typography sx={{ mt: 2 }}>{msg}</Typography>}
            </Paper>
        </div>
    );
};

export default AdminLogin;
