import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connectSocket } from "../socket";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "../utils/Toast"
import { API_BASE_URL } from "../utils/Config"

export default function Login({ setIsAuth }) {
    const [step, setStep] = useState("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // 🔐 SEND OTP
    const sendOTP = async () => {
        if (!email) return alert("Enter email");

        try {
            setLoading(true);

            await axios.post(`${API_BASE_URL}/auth/send-otp`, { email });
            setStep("otp");
        } catch {
            return toast("Failed to Send OTP", "error");
        } finally {
            setLoading(false);
        }
    };

    // 🔐 VERIFY OTP
    const verifyOTP = async () => {
        if (!otp) return toast("Enter OTP", "info");

        try {
            setLoading(true);
            const res = await axios.post(
                `${API_BASE_URL}/auth/verify-otp`,
                { email, otp }
            );

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userEmail", email);
            setIsAuth(true);
            connectSocket();
            toast("OTP verified successfully", "success");
            navigate("/rooms");
        } catch {
            return toast("Failed to verify OTP", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">

            <Navbar />

            {/* MAIN */}
            <main className="flex-1 flex items-center justify-center px-4 py-20">
                <div
                    className="
                        w-full max-w-4xl min-h-[460px]
                        bg-white rounded-[2.5rem]
                        shadow-2xl overflow-hidden
                        grid grid-cols-1 md:grid-cols-2
                    "
                >
                    {/* LEFT – FORM (MOBILE FIRST) */}
                    <div className="p-7 sm:p-12 flex flex-col justify-center relative z-10 order-2 md:order-1">

                        <h2 className="text-3xl font-bold text-slate-800 mb-2">
                            Hello Chatty 💬
                        </h2>
                        <p className="text-slate-500 mb-8">
                            Sign in to your Huddle account
                        </p>

                        {/* EMAIL STEP */}
                        <div
                            className={`transition-all duration-500 ease-out
                                ${step === "email"
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 -translate-x-6 pointer-events-none absolute"
                                }`}
                        >
                            <div className="space-y-5">
                                <input
                                    className="
                                        w-full px-4 py-3 rounded-lg border
                                        focus:outline-none focus:ring-2 focus:ring-indigo-500
                                        transition
                                    "
                                    placeholder="Email address"
                                    value={email}
                                    maxLength={55}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                <button
                                    onClick={sendOTP}
                                    disabled={loading}
                                    className="
                                        w-full py-3 rounded-lg font-semibold text-white
                                        bg-gradient-to-r from-indigo-600 to-purple-600
                                        hover:opacity-90 active:scale-[0.97]
                                        transition-all shadow-lg
                                        disabled:opacity-60
                                    "
                                >
                                    {loading ? "Sending OTP..." : "Send OTP"}
                                </button>
                            </div>
                        </div>

                        {/* OTP STEP */}
                        <div
                            className={`transition-all duration-500 ease-out
                                ${step === "otp"
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 translate-x-6 pointer-events-none absolute"
                                }`}
                        >
                            <div className="space-y-5">
                                <input
                                    className="
                                        w-full px-4 py-3 rounded-lg border
                                        text-center tracking-[0.3em] text-lg
                                        focus:outline-none focus:ring-2 focus:ring-emerald-500
                                        transition
                                    "
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />

                                <button
                                    onClick={verifyOTP}
                                    disabled={loading}
                                    className="
                                        w-full py-3 rounded-lg font-semibold text-white
                                        bg-gradient-to-r from-emerald-500 to-teal-500
                                        hover:opacity-90 active:scale-[0.97]
                                        transition-all shadow-lg
                                        disabled:opacity-60
                                    "
                                >
                                    {loading ? "Verifying..." : "Verify OTP"}
                                </button>

                                <p className="text-xs text-slate-400 text-center">
                                    Didn’t receive OTP? Check spam folder
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT – GRADIENT PANEL */}
                    <div
                        className="
                             md:flex items-center justify-center flex order-1 md:order-2
                            bg-gradient-to-br from-purple-600 to-indigo-700
                            text-white p-12 relative
                        "
                    >
                        {/* DRAMATIC CURVE */}
                        <div
                            className="
                                absolute inset-y-0 left-0 w-14
                                bg-white hidden md:block
                                rounded-tr-[120px] rounded-br-[120px]
                            "
                        />

                        <div className="relative z-10 max-w-sm text-center space-y-4">
                            <h3 className="text-3xl font-bold">
                                Welcome Back!
                            </h3>
                            <p className="
                                text-indigo-100 
                                leading-relaxed 
                                text-sm sm:text-base
                                max-w-md 
                                mx-auto
                            ">
                                Huddle lets you create <span className="font-semibold text-white">
                                    private, password-protected chat rooms</span> with OTP-based authentication
                                and real-time messaging.
                            </p>

                            <p className="
                                text-indigo-100 
                                leading-relaxed 
                                text-sm sm:text-base
                                max-w-md 
                                mx-auto 
                                mt-4
                            ">
                                Join secure, real-time conversations with your team and friends —
                                <span className="font-semibold text-white">
                                    instantly and effortlessly.
                                </span>
                            </p>

                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
