import { io } from "socket.io-client";
import { API_BASE_URL } from "../src/utils/Config";  // ← Add this

let socket = null;

export const connectSocket = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    socket = io(API_BASE_URL.replace("/api", ""), {
        auth: { token },
        transports: ["websocket"],
    });

    return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
