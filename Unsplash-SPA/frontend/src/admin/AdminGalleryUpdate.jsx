import { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, MenuItem } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "../utils/Toast";
import UploadIcon from "@mui/icons-material/Upload";

export default function AdminGalleryUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "nature",
    image: null,
    currentImage: "", // existing image
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

  // Fetch image details
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/gallery/fetch/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(res.data);
        // toast(`Image ${res.data.title} updated successfully`, "success");
        setForm({
          title: res.data.title,
          description: res.data.description,
          category: res.data.category,
          image: null,
          currentImage: res.data.image,
        });
      } catch (err) {
        toast("Error loading image", "error");
      }
    };

    fetchImage();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("category", form.category);

      if (form.image) {
        formData.append("image", form.image);
      }

      await axios.put(
        `http://localhost:5000/api/gallery/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast("Image updated successfully", "success");
      navigate("/admin/gallery");
    } catch (err) {
      toast("Update failed", "error");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Top bar */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
        <Button
          variant="outlined"
          onClick={() => navigate("/admin/gallery")}
          sx={{ color: "white", borderColor: "rgba(255,255,255,0.3)" }}
        >
          Back
        </Button>

        <h1 className="text-xl font-semibold">Update Image</h1>

        <Button
          variant="outlined"
          onClick={() => {
            localStorage.clear();
            navigate("/admin");
          }}
          sx={{ color: "white", borderColor: "rgba(255,255,255,0.3)" }}
        >
          Logout
        </Button>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center p-6">
        <div
          className="w-full max-w-md 
          bg-white/10 backdrop-blur-xl 
          border border-white/20 
          rounded-2xl p-8 shadow-xl"
        >
          <h2 className="text-2xl mb-6 text-center">Edit Image Details</h2>

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
          {/* <p className="text-sm text-white/80">{form.image}</p> */}
          <p className="text-sm text-white/80">
            {form.image
              ? form.image.name
              : form.currentImage || "No image selected"}
          </p>

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
            onClick={handleUpdate}
          >
            Save Changes
          </Button>
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
