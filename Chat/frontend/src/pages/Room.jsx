import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { disconnectSocket } from "../socket";
import { toast } from "../utils/Toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Room({ setIsAuth }) {
    const [roomId, setRoomId] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const myEmail = localStorage.getItem("userEmail");

    // 🚪 JOIN ROOM (CREATE OR VERIFY)
    const joinRoom = () => {
        if (!roomId || !password) {
            return toast("Please enter Room ID and Password", "error");
        }
        localStorage.setItem("currentRoomId", roomId);
        localStorage.setItem("currentRoomPassword", password);

        navigate(`/chat/${roomId}`, {
            state: { password }, // 🔐 pass securely (not URL)
        });
    };

    // 🚪 LOGOUT
    const logout = () => {
        disconnectSocket();
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");

        localStorage.removeItem("currentRoomId");
        localStorage.removeItem("currentRoomPassword");

        setIsAuth(false);
        navigate("/", { replace: true });
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-100">
            <Navbar />

            {/* MAIN */}
            <main className="flex-1 flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-8">

                    {/* USER INFO */}
                    <div className="flex items-center justify-between">
                        <div className="min-w-0">
                            <p className="text-xs uppercase tracking-wide text-slate-500">
                                Logged in as
                            </p>
                            <p className="text-sm font-medium text-slate-800 break-all">
                                {myEmail}
                            </p>
                        </div>

                        <button
                            onClick={logout}
                            className="
                                px-4 py-1.5 rounded-lg text-sm
                                bg-red-500 hover:bg-red-600
                                text-white transition
                            "
                        >
                            Logout
                        </button>
                    </div>

                    <hr />

                    {/* JOIN ROOM */}
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-1">
                            Join a Secure Room
                        </h2>
                        <p className="text-sm text-slate-500 mb-6">
                            Create a new room or enter an existing one using its password.
                        </p>

                        {/* ROOM ID */}
                        <input
                            className="
                                w-full border border-slate-300
                                px-4 py-3 rounded-lg mb-4
                                focus:outline-none focus:ring-2
                                focus:ring-indigo-500
                            "
                            placeholder="Room ID (unique)"
                            value={roomId}
                            maxLength={20}
                            onChange={(e) => setRoomId(e.target.value)}
                        />

                        {/* ROOM PASSWORD */}
                        <input
                            type="password"
                            className="
                                w-full border border-slate-300
                                px-4 py-3 rounded-lg mb-5
                                focus:outline-none focus:ring-2
                                focus:ring-indigo-500
                            "
                            placeholder="Room password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            onClick={joinRoom}
                            className="
                                w-full py-3 rounded-lg
                                bg-indigo-600 hover:bg-indigo-700
                                text-white font-semibold
                                active:scale-[0.98]
                                transition
                            "
                        >
                            Join Room
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
