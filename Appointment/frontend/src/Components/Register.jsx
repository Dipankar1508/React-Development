import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "./Toast";

const Register = () => {
    const url = `http://localhost:7000/api/auth`
    const navigate = useNavigate();

    const [showPin, setShowPin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        doctorPin: "",
    });

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    }, []);

    // ✅ Handle input changes
    const handleInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    };

    // ✅ Show PIN field when doctor is selected
    const handleShowPin = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
        })
        if (value === "doctor") {
            setShowPin(true);
        } else {
            setShowPin(false);
        }
    };

    // ✅ Handle form submission (you’ll connect to backend later)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(`${url}/register`, formData);
            console.log("Response:", { data });
            toast(data.message);

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // if (data.user.role === "doctor") {
            //     navigate("/doctorform");
            // } else {
            //     navigate("/patientform");
            // }
            setTimeout(() => {
                navigate("/login");
            }, 2000);


        } catch (err) {
            toast(
                err.response?.data?.message ||
                "Login failed. Please try again."
            );
            console.error("Register error:", err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-[90%] sm:w-[450px]">
                <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
                    Create Your Account ✨
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-600 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInput}
                            placeholder="Enter your full name"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

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

                    <div>
                        <label className="block text-gray-600 mb-1">Select Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleShowPin}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        >
                            <option value="">-- Choose Role --</option>
                            <option value="doctor">Doctor</option>
                            <option value="patient">Patient</option>
                        </select>
                    </div>

                    {showPin && (
                        <div>
                            <label className="block text-gray-600 mb-1">Doctor PIN</label>
                            <input
                                type="text"
                                name="doctorPin"
                                value={formData.doctorPin}
                                onChange={handleInput}
                                placeholder="Enter Doctor PIN"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full text-white py-2 rounded-lg transition ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700"
                            }`}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="text-center text-gray-500 mt-4 text-sm">
                    Already have an account?{" "}
                    <a href="/login" className="text-indigo-600 font-medium">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
