import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const url = `http://localhost:7000/api/auth`;
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // ✅ Handle input change
    const handleInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    }, []);

    // ✅ Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.post(`${url}/login`, formData);
            console.log("Response:", data);

            // ✅ Save token & user
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // ✅ Redirect based on role
            if (data.user.role === "doctor") {
                navigate("/doctor/dashboard");
            } else {
                navigate("/patient/dashboard");
            }
        } catch (err) {
            console.error("Login error:", err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-[90%] sm:w-[450px]">
                <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
                    Welcome Back 👋
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInput}
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInput}
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full text-white py-2 rounded-lg transition ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700"
                            }`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-gray-500 mt-4 text-sm">
                    Don't have an account?{" "}
                    <a href="/register" className="text-indigo-600 font-medium">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
