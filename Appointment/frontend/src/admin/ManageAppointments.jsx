import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE, authHeader } from "./api";
import {
  Paper, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Chip, Dialog, DialogTitle,
  DialogContent, DialogActions, Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminTopBar from "./AdminTopBar";

const StatusChip = ({ status }) => {
  const map = {
    Pending: { bg: "rgba(255,214,0,0.2)", color: "white" },
    Completed: { bg: "rgba(0,200,83,0.2)", color: "white" },
    Cancelled: { bg: "rgba(239,83,80,0.2)", color: "white" },
  };
  const s = map[status] || map.Pending;
  return <Chip label={status} size="small" sx={{ bgcolor: s.bg, color: s.color }} />;
};

const ManageAppointments = () => {
  const [rows, setRows] = useState([]);
  const [confirm, setConfirm] = useState(null);
  const [msg, setMsg] = useState("");

  const load = async () => {
    try {
      const res = await axios.get(`${API_BASE}/appointments`, { headers: authHeader() });
      setRows(res.data || []);
    } catch (e) {
      setMsg(e.response?.data?.message || "Failed to load appointments");
    }
  };
  useEffect(() => { load(); }, []);

  const del = async (id) => {
    try {
      await axios.delete(`${API_BASE}/appointments/${id}`, { headers: authHeader() });
      setRows((r) => r.filter((x) => x._id !== id));
      setConfirm(null);
    } catch (e) {
      setMsg(e.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1b30] text-white flex justify-center p-6 md:p-12">
      <Paper elevation={10} sx={{
        width: "100%", maxWidth: 1100, p: 4, borderRadius: 4,
        bgcolor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)"
      }}>
        <AdminTopBar title="Manage Appointments" />

        <TableContainer sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#b3cde0" }}>Doctor</TableCell>
                <TableCell sx={{ color: "#b3cde0" }}>Patient</TableCell>
                <TableCell sx={{ color: "#b3cde0" }}>Appointment Date</TableCell>
                <TableCell sx={{ color: "#b3cde0" }}>Status</TableCell>
                <TableCell align="right" sx={{ color: "#b3cde0" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((a) => (
                <TableRow key={a._id}>
                  <TableCell sx={{ color: "white" }}>{a.doctorId?.name || a.doctorName}</TableCell>
                  <TableCell sx={{ color: "white" }}>{a.patientId?.name || a.patientName}</TableCell>
                  <TableCell sx={{ color: "white" }}>{new Date(a.date).toLocaleDateString("en-GB")}</TableCell>
                  <TableCell><StatusChip status={a.status} /></TableCell>
                  <TableCell align="right">
                    <IconButton color="error" onClick={() => setConfirm(a)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} sx={{ color: "white" }}>No appointments found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {msg && <Typography sx={{ mt: 2 }}>{msg}</Typography>}

        <Dialog open={!!confirm} onClose={() => setConfirm(null)}>
          <DialogTitle>Delete Appointment?</DialogTitle>
          <DialogContent>This action cannot be undone.</DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirm(null)}>Cancel</Button>
            <Button color="error" onClick={() => del(confirm._id)}>Delete</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </div>
  );
};

export default ManageAppointments;
