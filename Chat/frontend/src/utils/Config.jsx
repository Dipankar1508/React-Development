const isProduction = import.meta.env.PROD === true || import.meta.env.MODE === 'production';

export const API_BASE_URL = isProduction
    ? "https://your-backend.onrender.com/api"
    : "http://localhost:5000/api";            
