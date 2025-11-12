import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE, authHeader } from "./api";
import {
    Paper, Typography, Table, TableHead, TableRow,
    TableCell, TableBody, TableContainer, IconButton, Dialog,
    DialogTitle, DialogContent, DialogActions, Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminTopBar from "./AdminTopBar";

const ManageFeedbacks = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [msg, setMsg] = useState("");
    const [confirm, setConfirm] = useState(null);

    // Load all feedbacks
    const loadFeedback = async () => {
        try {
            const res = await axios.get(`${API_BASE}/feedback`, {
                headers: authHeader(),
            });
            setFeedbacks(res.data || []);
        } catch (err) {
            setMsg(err.response?.data?.message || "Failed to load feedback");
        }
    };

    useEffect(() => {
        loadFeedback();
    }, []);

    // Delete Feedback Function
    const deleteFeedback = async (id) => {
        try {
            await axios.delete(`${API_BASE}/feedback/${id}`, {
                headers: authHeader(),
            });
            setFeedbacks((prev) => prev.filter((f) => f._id !== id));
            setConfirm(null);
        } catch (err) {
            setMsg(err.response?.data?.message || "Failed to delete feedback");
        }
    };

    return (
        <div className="min-h-screen bg-[#0b1b30] text-white flex justify-center p-6 md:p-12">
            <Paper
                elevation={10}
                sx={{
                    width: "100%",
                    maxWidth: 1100,
                    p: 4,
                    borderRadius: 4,
                    bgcolor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.12)",
                }}
            >
                <AdminTopBar title="Manage Feedback" />

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: "#b3cde0" }}>Name</TableCell>
                                <TableCell sx={{ color: "#b3cde0" }}>Email</TableCell>
                                <TableCell sx={{ color: "#b3cde0" }}>Message</TableCell>
                                <TableCell sx={{ color: "#b3cde0" }}>Date</TableCell>
                                <TableCell align="right" sx={{ color: "#b3cde0" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {feedbacks.length > 0 ? (
                                feedbacks.map((fb) => (
                                    <TableRow key={fb._id}>
                                        <TableCell sx={{ color: "white" }}>{fb.name}</TableCell>
                                        <TableCell sx={{ color: "white" }}>{fb.email}</TableCell>
                                        <TableCell sx={{ color: "white" }}>{fb.message}</TableCell>
                                        <TableCell sx={{ color: "white" }}>
                                            {new Date(fb.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton color="error" onClick={() => setConfirm(fb)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} sx={{ color: "white" }}>
                                        No feedback yet.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {msg && (
                    <Typography sx={{ mt: 2, color: "tomato" }}>
                        {msg}
                    </Typography>
                )}

                {/* Confirmation Dialog */}
                <Dialog open={!!confirm} onClose={() => setConfirm(null)}>
                    <DialogTitle>Delete Feedback?</DialogTitle>
                    <DialogContent>
                        Are you sure you want to delete this feedback from{" "}
                        <strong>{confirm?.name}</strong>?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setConfirm(null)}>Cancel</Button>
                        <Button color="error" onClick={() => deleteFeedback(confirm._id)}>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </div>
    );
};

export default ManageFeedbacks;
