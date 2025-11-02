import React, { useEffect, useState } from "react";
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
import { useParams, useNavigate } from "react-router-dom";

const bloodGroups = ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"];
const genders = ["Male", "Female", "Other"];

const PatientEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const url = "http://localhost:7000/api/patient/data/edit";
  const token = localStorage.getItem("token");

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

  // Fetch Existing Patient Data
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(`${url}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.data;
        setFormData({
          name: data.name,
          age: data.age,
          gender: data.gender,
          phone: data.phone,
          address: data.address,
          bloodGroup: data.bloodGroup,
          hasChronicDiseases: data.hasChronicDiseases,
          chronicDiseases: data.chronicDiseases || "",
        });
      } catch (err) {
        console.error("Error fetching patient:", err);
        setMessage("Failed to fetch patient data.");
      }
    };
    fetchPatient();
  }, [id, token]);

  // ------------------------------
  // Handlers
  // ------------------------------
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
    setLoading(true);
    try {
      const response = await axios.put(`${url}/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(response.data.message || "Patient updated successfully!");
      setTimeout(() => navigate("/patient/dashboard"), 1500);
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message || "Failed to update patient profile."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => navigate("/patient/dashboard");

  // ------------------------------
  // JSX (Light Theme)
  // ------------------------------
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#e9f7ff] via-[#f5fbff] to-[#e9f7ff] p-8">
      <Paper
        elevation={8}
        sx={{
          width: "100%",
          maxWidth: 650,
          borderRadius: 4,
          p: 5,
          background: "rgba(255,255,255,0.85)",
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
          Edit Patient Profile
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
                sx={{ bgcolor: "#f9f9f9", borderRadius: 2 }}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                sx={{ bgcolor: "#f9f9f9", borderRadius: 2 }}
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
                sx={{ bgcolor: "#f9f9f9", borderRadius: 2 }}
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
                sx={{ bgcolor: "#f9f9f9", borderRadius: 2 }}
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
              sx={{ bgcolor: "#f9f9f9", borderRadius: 2 }}
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
              sx={{ bgcolor: "#f9f9f9", borderRadius: 2 }}
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
                  sx={{ bgcolor: "#f9f9f9", borderRadius: 2, mt: 1 }}
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
              {loading ? "Updating..." : "Save Changes"}
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
              onClick={handleBack}
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

export default PatientEditForm;
