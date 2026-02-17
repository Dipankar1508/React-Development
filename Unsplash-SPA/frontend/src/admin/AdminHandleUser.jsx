import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "../utils/Toast";

const AdminHandleUser = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const getusers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getusers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `http://localhost:5000/api/admin/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast("User deleted successfully", "success");
      // getusers();
      setUsers(res.data);
    } catch (err) {
      console.log(err);
      toast("Something went wrong", "error");
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

        <h1 className="text-xl font-semibold">Manage Users</h1>

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

      {/* Users list */}
      <div className="px-4 sm:px-8 py-8">
        {users.length === 0 ? (
          <p className="text-white/60 text-center mt-10">No users found.</p>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white/8 backdrop-blur-lg
          border border-white/10
          rounded-2xl p-6
          flex flex-col md:flex-row
          md:items-center md:justify-between
          gap-6
          hover:bg-white/12 transition"
              >
                {/* Left section */}
                <div className="flex items-center gap-5">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-lg font-semibold">
                    {user.username?.charAt(0).toUpperCase()}
                  </div>

                  {/* User info */}
                  <div className="flex flex-col gap-1">
                    <span className="text-lg font-semibold">
                      {user.username}
                    </span>
                    <span className="text-sm text-white/60">{user.email}</span>
                  </div>
                </div>

                {/* Right section */}
                <div className="flex items-center justify-between md:justify-end gap-4">
                  {/* Role */}
                  <span
                    className={`text-sm px-4 py-1.5 rounded-full font-medium
              ${
                user.role === "admin"
                  ? "bg-red-500/20 text-red-400"
                  : "bg-green-500/20 text-green-400"
              }`}
                  >
                    {user.role}
                  </span>

                  {/* Delete button */}
                  <Button
                    variant="outlined"
                    color="error"
                    size="medium"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHandleUser;
