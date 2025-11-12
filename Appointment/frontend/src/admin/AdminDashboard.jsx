import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE, authHeader } from "./api";
import {
  Paper, Typography, Grid, Card, CardContent, Box, Button, Divider
} from "@mui/material";
import AdminTopBar from "./AdminTopBar";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";

const StatCard = ({ label, value }) => (
  <Card sx={{
    backdropFilter: "blur(8px)",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.18)",
    color: "white",
    borderRadius: 4,
    textAlign: "center",
    p: 2,
    transition: ".3s",
    "&:hover": { boxShadow: "0 0 16px rgba(0,200,255,0.4)" }
  }}>
    <Typography sx={{ opacity: 0.7, fontSize: 14 }}>{label}</Typography>
    <Typography variant="h4" sx={{ fontWeight: 700 }}>{value}</Typography>
  </Card>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, doctors: 0, patients: 0, appointments: 0, feedbacks: 0 });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${API_BASE}/dashboard`, { headers: authHeader() });
        setStats({
          users: res.data.users?.length || 0,
          doctors: res.data.doctors?.length || 0,
          patients: res.data.patients?.length || 0,
          appointments: res.data.appointments?.length || 0,
          feedbacks: res.data.feedbacks?.length || 0
        });
      } catch (e) {
        setMsg(e.response?.data?.message || "Failed to load dashboard");
      }
    };
    load();
  }, []);

  const chartData = {
    options: {
      chart: {
        id: "Service-Stats",
        foreColor: "#ffffff",
        toolbar: {
          show: true,
          tools: {
            download: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            reset: true
          }
        }
      },
      xaxis: { categories: ["Users", "Doctors", "Patients", "Appointments"] },
      colors: ["#00e1ff"],
      dataLabels: { enabled: true },
      plotOptions: {
        bar: { borderRadius: 6, distributed: true }
      }
    },
    series: [{ name: "Count", data: [stats.users, stats.doctors, stats.patients, stats.appointments] }]
  };

  return (
    <div className="min-h-screen bg-[#061A2B] text-white flex justify-center p-8 px-10">
      <Paper
        elevation={12}
        sx={{
          width: "100%",
          maxWidth: 1300,
          p: 5,
          borderRadius: 5,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(18px)"
        }}
      >
        <AdminTopBar title="Admin Dashboard" />

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ my: 3 }}>
          <Grid item xs={12} md={3}><StatCard label="Total Users" value={stats.users} /></Grid>
          <Grid item xs={12} md={3}><StatCard label="Doctors" value={stats.doctors} /></Grid>
          <Grid item xs={12} md={3}><StatCard label="Patients" value={stats.patients} /></Grid>
          <Grid item xs={12} md={3}><StatCard label="Appointments" value={stats.appointments} /></Grid>
          <Grid item xs={12} md={3}><StatCard label="Feedbacks" value={stats.feedbacks} /></Grid>

        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 3 }} />

        {/* Buttons ABOVE Chart */}
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
          {[
            ["Manage Users", "/admin/manageusers"],
            ["Manage Doctors", "/admin/managedoctors"],
            ["Manage Patients", "/admin/managepatients"],
            ["Manage Appointments", "/admin/manageappointments"],
            ["Manage Feedbacks", "/admin/managefeedbacks"],
          ].map(([text, path]) => (
            <Button
              key={text}
              variant="contained"
              onClick={() => navigate(path)}
              sx={{
                borderRadius: 3,
                px: 3.5,
                py: 1.3,
                fontWeight: 600,
                letterSpacing: 0.7,
                fontSize: "0.95rem",
                textTransform: "none",
                background: "linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)",
                boxShadow: "0 4px 15px rgba(255, 94, 98, 0.4)",
                transition: "all 0.3s ease",
                "&:hover": {
                  // transform: "translateY(-4px)",
                  background: "linear-gradient(135deg, #FF7B5E 0%, #FF3D68 100%)",
                  boxShadow: "0 8px 25px rgba(255, 94, 98, 0.6)",
                },
                "&:active": {
                  transform: "translateY(0px) scale(0.97)",
                  boxShadow: "0 3px 8px rgba(255, 94, 98, 0.35)",
                },
              }}
            >
              {text}
            </Button>

          ))}
        </Box>

        {/* Chart Section */}
        <Typography variant="h6" sx={{ mb: 2, opacity: 0.8, color: "#00d4ff" }}>Analytics Overview</Typography>
        <Box sx={{ background: "rgba(255,255,255,0.05)", borderRadius: 3, p: 3 }}>
          <Chart options={chartData.options} series={chartData.series} type="bar" height={320} />
        </Box>

        {msg && <Typography sx={{ mt: 2, color: "#ff7b7b" }}>{msg}</Typography>}
      </Paper>
    </div>
  );
};

export default AdminDashboard;
