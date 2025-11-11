import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminTopBar = ({ title }) => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" }, // Responsive direction
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", md: "center" }, // Align text left on mobile
                gap: 2,
                mb: 4,
            }}
        >
            {/* Title */}
            <Typography
                variant="h4"
                sx={{
                    color: "#00d4ff",
                    fontWeight: 700,
                    textAlign: { xs: "left", md: "left" },
                }}
            >
                {title}
            </Typography>

            {/* Right Buttons */}
            <Box
                sx={{
                    display: "flex",
                    gap: 1.5,
                    flexWrap: "wrap", // allow wrap on smaller screens
                    justifyContent: { xs: "flex-start", md: "flex-end" },
                }}
            >
                {/* <Button
                    variant="outlined"
                    onClick={() => navigate("/admin/dashboard")}
                    sx={{
                        borderColor: "#00d4ff",
                        color: "#00d4ff",
                        borderRadius: 2,
                        px: 2,
                    }}
                >
                    Dashboard
                </Button> */}

                <Button
                    variant="outlined"
                    onClick={() => navigate(-1)} // Go back to actual previous page
                    sx={{
                        borderColor: "#00d4ff",
                        color: "#00d4ff",
                        borderRadius: 2,
                        px: 2,
                    }}
                >
                    Back
                </Button>

                <Button
                    variant="outlined"
                    onClick={logout}
                    sx={{
                        borderColor: "#ef5350",
                        color: "#ef5350",
                        borderRadius: 2,
                        px: 2,
                    }}
                >
                    Logout
                </Button>
            </Box>
        </Box>
    );
};

export default AdminTopBar;
