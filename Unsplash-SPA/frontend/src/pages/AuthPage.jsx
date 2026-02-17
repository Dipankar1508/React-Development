import { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "../utils/Toast";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    identifier: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        // LOGIN
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          identifier: form.identifier,
          password: form.password,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        if (res.data.role === "admin") {
          toast("Login successful.", "success");
          navigate("/admin/dashboard");
        } else if (res.data.role === "user") {
          toast("Login successful.", "success");
          navigate("/");
        } else {
          toast("Login failed.", "error");
          navigate("/");
        }
      } else {
        // REGISTER
        await axios.post("http://localhost:5000/api/auth/register", form);
        toast("Registration successful. Please login.", "success");
        // alert("Registration successful. Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center 
        bg-linear-to-br from-gray-900 via-black to-gray-800 px-4"
    >
      <div
        className="w-full max-w-5xl rounded-3xl overflow-hidden 
            shadow-2xl bg-white/10 backdrop-blur-xl 
            border border-white/20 flex flex-col md:flex-row"
      >
        {/* LEFT SIDE (FORM) */}
        <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
          {/* Logo */}
          {/* <div className="flex justify-center mb-6">
                        <img
                            src="/images/ViewPort_Logo.png"
                            alt="Logo"
                            className="h-14 object-contain"
                        />
                    </div> */}

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          <p className="text-white/60 mb-6">
            {isLogin
              ? "Sign in to continue"
              : "Register to start using ViewPort"}
          </p>

          {/* Register-only fields */}
          {!isLogin && (
            <>
              <TextField
                label="Username"
                name="username"
                fullWidth
                margin="normal"
                variant="filled"
                onChange={handleChange}
                sx={inputStyle}
                slotProps={{
                  input: { maxLength: 50 },
                }}
              />

              <TextField
                label="Email"
                name="email"
                fullWidth
                margin="normal"
                variant="filled"
                onChange={handleChange}
                sx={inputStyle}
                slotProps={{
                  input: { maxLength: 70 },
                }}
              />
            </>
          )}

          {/* Login-only fields -- only appears when Login is required*/}
          {isLogin && (
            <TextField
              label="Username or Email"
              name="identifier"
              fullWidth
              margin="normal"
              variant="filled"
              onChange={handleChange}
              sx={inputStyle}
              slotProps={{
                input: { maxLength: 50 },
              }}
            />
          )}

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            variant="filled"
            onChange={handleChange}
            sx={inputStyle}
            slotProps={{
              input: { maxLength: 50 },
            }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            sx={{
              mt: 3,
              py: 1.3,
              borderRadius: "10px",
              fontWeight: "bold",
            }}
          >
            {isLogin ? "Login" : "Register"}
          </Button>

          {/* Toggle link */}
          <p className="text-sm text-white/70 text-center mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="text-purple-400 ml-2 cursor-pointer font-semibold"
            >
              {isLogin ? "Register" : "Login"}
            </span>
          </p>

          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate("/")}
            sx={{
              mt: 2,
              color: "white",
              borderColor: "rgba(255,255,255,0.3)",
              borderRadius: "10px",
              py: 1.2,
              textTransform: "none",
              "&:hover": {
                borderColor: "white",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            Back to Gallery
          </Button>
        </div>

        {/* RIGHT SIDE (INFO PANEL) */}
        <div
          className="hidden md:flex w-1/2 relative overflow-hidden 
                items-center justify-center text-center px-10"
        >
          {/* Animated glow background */}
          <div
            className="absolute inset-0 
                    bg-linear-to-br from-purple-600/30 via-indigo-500/20 to-blue-500/30 
                    blur-3xl animate-pulse"
          ></div>

          {/* Content (no outer box) */}
          <div
            key={isLogin}
            className="relative z-10 flex flex-col items-center 
                        transition-all duration-500 opacity-0 animate-fadeIn"
          >
            {/* Logo */}
            <img
              src="/images/ViewPort_Logo.png"
              alt="Logo"
              className="h-30 mb-6 object-contain"
            />

            {/* Heading */}
            <h2 className="text-4xl font-bold text-white mb-4">
              {isLogin ? "Welcome Back" : "Join ViewPort"}
            </h2>

            {/* Text */}
            <p className="text-white/80 max-w-sm">
              {isLogin
                ? "Access your dashboard and manage your photo collection."
                : "Create an account and start sharing your stunning visuals."}
            </p>
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
