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

const ManageDoctors = () => {
  const [rows, setRows] = useState([]);
  const [confirm, setConfirm] = useState(null);
  const [msg, setMsg] = useState("");

  const load = async () => {
    try {
      const res = await axios.get(`${API_BASE}/doctors`, { headers: authHeader() });
      setRows(res.data || []);
    } catch (e) {
      setMsg(e.response?.data?.message || "Failed to load doctors");
    }
  };
  useEffect(() => { load(); }, []);

  const del = async (id) => {
    try {
      await axios.delete(`${API_BASE}/doctors/${id}`, { headers: authHeader() });
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
        <AdminTopBar title="Manage Doctors" />

        <TableContainer sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#b3cde0" }}>Name</TableCell>
                <TableCell sx={{ color: "#b3cde0" }}>Email</TableCell>
                <TableCell sx={{ color: "#b3cde0" }}>Specialization</TableCell>
                <TableCell sx={{ color: "#b3cde0" }}>Experience</TableCell>
                <TableCell sx={{ color: "#b3cde0" }}>Fee</TableCell>
                <TableCell align="right" sx={{ color: "#b3cde0" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((d) => (
                <TableRow key={d._id}>
                  <TableCell sx={{ color: "white" }}>{d.name}</TableCell>
                  <TableCell sx={{ color: "white" }}>{d.userId?.email}</TableCell>
                  <TableCell sx={{ color: "white" }}>
                    <Chip label={d.specialization} size="small" sx={{ color: "white" }} />
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>{d.experienceYears || "-"}</TableCell>
                  <TableCell sx={{ color: "white" }}>{d.consultationFee ? `₹${d.consultationFee}` : "-"}</TableCell>
                  <TableCell align="right">
                    <IconButton color="error" onClick={() => setConfirm(d)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} sx={{ color: "white" }}>No doctors found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {msg && <Typography sx={{ mt: 2 }}>{msg}</Typography>}

        <Dialog open={!!confirm} onClose={() => setConfirm(null)}>
          <DialogTitle>Delete Doctor?</DialogTitle>
          <DialogContent>This will remove the doctor profile (does not delete the User record here).</DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirm(null)}>Cancel</Button>
            <Button color="error" onClick={() => del(confirm._id)}>Delete</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </div>
  );
};

export default ManageDoctors;
