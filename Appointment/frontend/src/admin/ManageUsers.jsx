import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE, authHeader } from "./api";
import {
  Paper, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Chip, Box, Dialog, DialogTitle,
  DialogContent, DialogActions, Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminTopBar from "./AdminTopBar";

const RoleChip = ({ role }) => (
  <Chip
    label={role}
    size="small"
    sx={{
      bgcolor: role === "doctor" ? "rgba(0,200,83,0.2)" : "rgba(0,229,255,0.2)",
      color: "white", border: "1px solid rgba(255,255,255,0.2)"
    }}
  />
);

const ManageUsers = () => {
  const [rows, setRows] = useState([]);
  const [confirm, setConfirm] = useState(null);
  const [msg, setMsg] = useState("");

  const load = async () => {
    try {
      const res = await axios.get(`${API_BASE}/users`, { headers: authHeader() });
      setRows(res.data || []);
    } catch (e) {
      setMsg(e.response?.data?.message || "Failed to load users");
    }
  };

  useEffect(() => { load(); }, []);

  const del = async (id) => {
    try {
      await axios.delete(`${API_BASE}/users/${id}`, { headers: authHeader() });
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
        <AdminTopBar title="Manage Users" />

        <TableContainer sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#b3cde0" }}>Name</TableCell>
                <TableCell sx={{ color: "#b3cde0" }}>Email</TableCell>
                <TableCell sx={{ color: "#b3cde0" }}>Role</TableCell>
                <TableCell align="right" sx={{ color: "#b3cde0" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((u) => (
                <TableRow key={u._id}>
                  <TableCell sx={{ color: "white" }}>{u.name}</TableCell>
                  <TableCell sx={{ color: "white" }}>{u.email}</TableCell>
                  <TableCell><RoleChip role={u.role} /></TableCell>
                  <TableCell align="right">
                    <IconButton color="error" onClick={() => setConfirm(u)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} sx={{ color: "white" }}>No users found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {msg && <Typography sx={{ mt: 2 }}>{msg}</Typography>}

        <Dialog open={!!confirm} onClose={() => setConfirm(null)}>
          <DialogTitle>Delete User?</DialogTitle>
          <DialogContent>Deleting a user will also remove linked Doctor/Patient profile and related appointments.</DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirm(null)}>Cancel</Button>
            <Button color="error" onClick={() => del(confirm._id)}>Delete</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </div>
  );
};

export default ManageUsers;
