import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "../utils/Toast";

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const fetchImages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/gallery/get/all");
      setImages(res.data);
    } catch (err) {
      console.log("Error fetching images");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/gallery/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast("Image deleted", "success");
      fetchImages(); // refresh list
    } catch (err) {
      toast("Delete failed", "error");
    }
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem("token");
      navigate(`/admin/gallery/update/${id}`);
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
          onClick={() => navigate("/admin/dashboard")}
          sx={{ color: "white", borderColor: "rgba(255,255,255,0.3)" }}
        >
          Back
        </Button>

        <h1 className="text-xl font-semibold">Manage Gallery</h1>

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

      {/* Gallery list */}
      <div className="p-6 space-y-4">
        {images.map((img) => (
          <div
            key={img._id}
            className="bg-white/10 backdrop-blur-md 
      border border-white/10 
      rounded-xl p-4 
      flex flex-col md:flex-row md:items-center 
      gap-4 transition hover:bg-white/15"
          >
            {/* Thumbnail */}
            <img
              src={`http://localhost:5000/uploads/${img.image}`}
              alt={img.title}
              className="w-full md:w-24 h-40 md:h-16 object-cover rounded-lg"
            />

            {/* Info section */}
            <div className="flex-1 space-y-1">
              <p className="font-semibold text-white">{img.image}</p>

              <p className="text-sm text-white/80">{img.title}</p>

              <p className="text-xs text-white/60 capitalize">{img.category}</p>

              <p className="text-xs text-white/50">
                {new Date(img.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 md:flex-col md:w-32">
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.3)",
                }}
                onClick={() => handleUpdate(img._id)}
              >
                Update
              </Button>

              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={() => handleDelete(img._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
