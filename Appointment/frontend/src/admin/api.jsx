// Small helper to keep headers tidy
export const API_BASE = "http://localhost:7000/api/admin";

export const authHeader = () => {
    const token = localStorage.getItem("adminToken");
    return { Authorization: `Bearer ${token}` };
};
