import { io } from "socket.io-client";

let socket = null;

export const connectSocket = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    socket = io("http://localhost:5000", {
        auth: { token },
        transports: ["websocket"],  // avoid polling issues
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
