import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getSocket, connectSocket, disconnectSocket } from "../socket";
import { toast } from "../utils/Toast";

export default function Chat({ setIsAuth }) {
    const { roomId: routeRoomId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // read from storage if coming from refresh
    const storedRoomId = localStorage.getItem("currentRoomId");
    const storedPassword = localStorage.getItem("currentRoomPassword");

    const roomId = routeRoomId || storedRoomId;
    const password = location.state?.password || storedPassword;



    const [msg, setMsg] = useState("");
    const [messages, setMessages] = useState([]);
    const [myEmail, setMyEmail] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [joined, setJoined] = useState(false);


    const bottomRef = useRef(null);
    const socketRef = useRef(null);

    // const password = location.state?.password;
    // console.log("Chat loaded:", { roomId, password, storedRoomId, storedPassword });

    useEffect(() => {
        if (!myEmail) {
            const storedEmail = localStorage.getItem("userEmail");
            if (storedEmail) setMyEmail(storedEmail);
        }
    }, [myEmail]);

    useEffect(() => {
        console.log("Guard check:", { roomId, password });  // ← add this
        if (!roomId || !password) {
            // alert("Room info missing. Please join again.");
            toast("Room info missing. Please join again", "info");
            navigate("/rooms");
        }
    }, [roomId, password, navigate]);


    // 🔌 SOCKET SETUP (UNCHANGED)
    useEffect(() => {
        if (!password) return;

        const socket = getSocket() || connectSocket();
        if (!socket) return;

        socketRef.current = socket;

        const handleMe = (email) => setMyEmail(email);
        const handleRoomMessages = (msgs) => {
            setMessages(msgs);
            setJoined(true);
        };
        const handleMessage = (data) =>
            setMessages((prev) => [...prev, data]);
        const handleJoinError = (msg) => {
            // alert(msg);
            toast("Could not join room. Please try again", "error");
            navigate("/rooms");
        };

        socket.emit("join", { roomId, password });

        socket.on("me", handleMe);
        socket.on("roomMessages", handleRoomMessages);
        socket.on("message", handleMessage);
        socket.on("joinError", handleJoinError);

        return () => {
            socket.off("me", handleMe);
            socket.off("roomMessages", handleRoomMessages);
            socket.off("message", handleMessage);
            socket.off("joinError", handleJoinError);
        };
    }, [roomId, password, navigate]);

    // 🔽 AUTO SCROLL
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const send = () => {
        if (!joined) return;
        if (!msg.trim()) return;
        if (!socketRef.current) return;

        socketRef.current.emit("message", {
            room: roomId,
            text: msg,
        });

        setMsg("");
    };


    // ⏰ FORMAT TIME
    const formatTime = (d) =>
        new Date(d).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

    // 🚪 LOGOUT
    const logout = () => {
        disconnectSocket();
        setJoined(false);
        setMessages([]);
        setMyEmail(null);

        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("currentRoomId");
        localStorage.removeItem("currentRoomPassword");

        setIsAuth(false);
        navigate("/", { replace: true });
    };

    const userInitial = myEmail ? myEmail.charAt(0).toUpperCase() : "?";


    return (
        <div className="h-screen flex flex-col bg-slate-100">

            {/* HEADER */}
            <header className="w-full bg-white border-b px-4 sm:px-6 py-3">
                <div className="flex items-center justify-between gap-4">

                    {/* LEFT: BACK + ROOM */}
                    <div className="flex items-center gap-4 min-w-0">

                        {/* BACK BUTTON */}
                        <button
                            onClick={() => navigate("/rooms")}
                            className="
                    flex items-center gap-1
                    px-3 py-2 rounded-lg text-sm font-medium
                    bg-slate-100 text-slate-700
                    hover:bg-slate-200 active:scale-[0.97]
                    transition
                "
                        >
                            <span className="text-base">←</span>
                            <span className=" sm:inline">Back</span>
                        </button>

                        {/* ROOM INFO (DESKTOP ONLY) */}
                        <div className="hidden sm:block min-w-0">
                            <p className="text-[11px] uppercase tracking-wide text-slate-400">
                                Room
                            </p>
                            <p className="font-semibold text-slate-800 break-words">
                                {roomId}
                            </p>
                        </div>
                    </div>

                    {/* RIGHT: USER + LOGOUT + MENU */}
                    <div className="flex items-center gap-3">

                        {/* USER INITIAL (DESKTOP) */}
                        <div className="relative hidden sm:block group">
                            <button
                                className="
                        w-10 h-10 rounded-lg
                        bg-indigo-600 text-white font-semibold
                        flex items-center justify-center
                        hover:bg-indigo-700 transition
                    "
                            >
                                {userInitial}
                            </button>

                            {/* TOOLTIP */}
                            <div
                                className="
                        absolute right-0 mt-2
                        hidden group-hover:block
                        bg-white border shadow-lg rounded-lg
                        px-4 py-2 text-sm text-slate-700
                        max-w-xs break-words z-50
                    "
                            >
                                {myEmail}
                            </div>
                        </div>

                        {/* LOGOUT (DESKTOP) */}
                        <button
                            onClick={logout}
                            className="
                    hidden sm:block
                    px-4 py-2 rounded-lg text-sm font-medium
                    bg-red-600 text-white
                    hover:bg-red-700 active:scale-[0.97]
                    transition
                "
                        >
                            Logout
                        </button>

                        {/* MOBILE MENU BUTTON */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="sm:hidden p-2 rounded-lg hover:bg-slate-100 transition"
                            aria-label="Open menu"
                        >
                            <div className="space-y-1.5">
                                <span className={`block w-6 h-0.5 bg-slate-700 transition ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                                <span className={`block w-6 h-0.5 bg-slate-700 transition ${menuOpen ? "opacity-0" : ""}`} />
                                <span className={`block w-6 h-0.5 bg-slate-700 transition ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                            </div>
                        </button>
                    </div>
                </div>

                {/* 📱 MOBILE MENU */}
                <div
                    className={`sm:hidden overflow-hidden transition-all duration-300
        ${menuOpen ? "max-h-60 border-t mt-3" : "max-h-0"}`}
                >
                    <div className="py-4 space-y-4 px-2">

                        <div>
                            <p className="text-xs text-slate-500">Room</p>
                            <p className="font-semibold break-words">{roomId}</p>
                        </div>

                        <div>
                            <p className="text-xs text-slate-500">Logged in as</p>
                            <p className="font-medium break-words">
                                {myEmail || "Loading..."}
                            </p>
                        </div>

                        <button
                            onClick={logout}
                            className="
                    w-full mt-2 px-4 py-2 rounded-lg
                    bg-red-600 text-white text-sm
                    hover:bg-red-700 transition
                "
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>


            {/* MESSAGES */}
            <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-4">
                {messages.map((m, i) => {
                    const isMe = m.sender === myEmail;

                    return (
                        <div
                            key={i}
                            className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`
                                    max-w-[85%] sm:max-w-[70%]
                                    px-4 py-3 rounded-2xl text-sm
                                    break-words whitespace-pre-wrap
                                    ${isMe
                                        ? "bg-indigo-600 text-white rounded-br-none"
                                        : "bg-white border text-slate-800 rounded-bl-none"
                                    }
                                `}
                            >
                                {!isMe && (
                                    <p className="text-[11px] text-slate-500 mb-1 break-words">
                                        {m.sender}
                                    </p>
                                )}

                                <p>{m.text}</p>

                                <p className="text-[10px] mt-1 text-right opacity-70">
                                    {formatTime(m.createdAt)}
                                </p>
                            </div>
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </main>

            {/* INPUT BAR */}
            <footer
                className="w-full bg-white border-t px-4 sm:px-6 py-3
                flex gap-3 items-center"
            >
                <input
                    className="
                        flex-1 border rounded-xl px-4 py-2
                        focus:outline-none focus:ring-2 focus:ring-indigo-500
                        break-words
                    "
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="Type your message…"
                    onKeyDown={(e) => e.key === "Enter" && send()}
                />

                <button
                    onClick={send}
                    disabled={!joined || !msg.trim()}
                    className="
        px-6 py-2 rounded-xl font-semibold
        bg-indigo-600 text-white
        hover:bg-indigo-700 transition
        disabled:opacity-40
    "
                >
                    Send
                </button>

            </footer>
        </div>
    );
}
