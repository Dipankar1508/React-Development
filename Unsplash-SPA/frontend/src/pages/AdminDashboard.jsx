import { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, MenuItem, Paper } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { toast } from "../utils/Toast";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalImages: 0,
    totalUsers: 0,
    recentUploads: 0,
    categoryStats: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/admin/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(res.data);

        setStats(res.data);
      } catch (err) {
        console.log("Error fetching stats");
      }
    };

    fetchStats();
  }, []);

  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "nature",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({
        ...form,
        image: e.target.files[0],
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleUpload = async () => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("image", form.image);

      await axios.post("http://localhost:5000/api/gallery/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // alert("Product uploaded!");
      toast("Image uploaded!", "success");
      // window.location.reload();

      // reset form
      setForm({
        title: "",
        description: "",
        category: "nature",
        image: null,
      });
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Top bar */}
      <div className="flex justify-between items-center gap-2 px-6 py-4 border-b border-white/10">
        <Button
          variant="outlined"
          onClick={() => navigate("/")}
          sx={{
            color: "white",
            borderColor: "rgba(255,255,255,0.3)",
          }}
        >
          Back
        </Button>

        <h1 className="text-xl font-semibold">Admin Dashboard</h1>

        <Button
          variant="outlined"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            navigate("/admin");
          }}
          sx={{
            color: "white",
            borderColor: "rgba(255,255,255,0.3)",
          }}
        >
          Logout
        </Button>
      </div>

      {/* Main split layout */}
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-72px)]">
        {/* LEFT PANEL – Upload */}
        <div
          className="w-full md:w-1/2 p-6 flex items-center justify-center 
            transition-all duration-500 order-2"
        >
          <div
            className="w-full max-w-md 
                bg-white/10 backdrop-blur-xl 
                border border-white/20 
                rounded-2xl p-8 shadow-xl"
          >
            <h2 className="text-2xl mb-6 text-center">Upload Image</h2>

            <TextField
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="filled"
              sx={inputStyle}
              slotProps={{
                input: { maxLength: 50 },
              }}
            />

            <TextField
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="filled"
              sx={inputStyle}
              multiline
              rows={3}
              slotProps={{
                input: { maxLength: 100 },
              }}
            />

            <TextField
              select
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="filled"
              sx={inputStyle}
            >
              <MenuItem value="nature">Nature</MenuItem>
              <MenuItem value="tech">Tech</MenuItem>
              <MenuItem value="car">Car</MenuItem>
              <MenuItem value="architecture">Architecture</MenuItem>
              <MenuItem value="others">Others</MenuItem>
            </TextField>

            <Button
              variant="outlined"
              fullWidth
              component="label"
              startIcon={<UploadIcon />}
              sx={{ mt: 3, borderRadius: "10px" }}
            >
              Select Image
              <input
                type="file"
                name="image"
                hidden
                accept="image/*"
                onChange={handleChange}
              />
            </Button>

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 3, borderRadius: "10px" }}
              onClick={handleUpload}
            >
              Upload
            </Button>
          </div>
        </div>

        {/* RIGHT PANEL – Management */}
        <div
          className="w-full md:w-1/2 p-6 flex items-center justify-center 
            transition-all duration-500 order-1"
        >
          <div
            className="w-full max-w-md 
                        bg-white/5 backdrop-blur-xl 
                        border border-white/10 
                        rounded-2xl p-8 animate-fadeIn"
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Gallery Manager
            </h2>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Total Images */}
              <div
                onClick={() => navigate("/admin/gallery")}
                className="cursor-pointer p-4 rounded-xl 
            bg-white/10 hover:bg-white/20 
            transition text-center"
              >
                <p className="text-2xl font-bold">{stats.totalImages}</p>
                <p className="text-xs text-white/60">Total Images</p>
              </div>

              {/* Total Users */}
              <div
                className="cursor-pointer p-4 rounded-xl 
            bg-white/10 hover:bg-white/20 text-center"
                onClick={() => navigate("/admin/users")}
              >
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
                <p className="text-xs text-white/60">Total Users</p>
              </div>
            </div>

            {/* Category Stats */}
            <div className="mb-6">
              <h3 className="text-sm text-white/60 mb-2">Images by Category</h3>

              <div className="space-y-2 text-sm">
                {stats.categoryStats.map((cat) => (
                  <div key={cat._id} className="flex justify-between">
                    <span className="capitalize">{cat._id}</span>
                    <span>{cat.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Uploads */}
            <div>
              <h3 className="text-sm text-white/60 mb-2">
                Recent Uploads (24 hrs)
              </h3>

              <div className="p-3 rounded-lg bg-white/10 text-center">
                <p className="text-xl font-semibold">{stats.recentUploads}</p>
                <p className="text-xs text-white/60">Images uploaded today</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const inputStyle = {
  input: { color: "white" },
  label: { color: "white" },
  backgroundColor: "rgba(255,255,255,0.08)",
  borderRadius: "8px",
};
