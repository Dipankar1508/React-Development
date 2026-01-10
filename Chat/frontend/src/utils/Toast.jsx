// utils/toast.js
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export const toast = (msg, type = "info") => {
    const colors = {
        success: "#22c55e",
        error: "#ef4444",
        warning: "#f59e0b",
        info: "#3b82f6",
    };

    Toastify({
        text: msg,
        duration: 3000,
        gravity: "top",
        position: "right",
        close: true,
        style: { background: colors[type] },
    }).showToast();
};
