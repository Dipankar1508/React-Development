// middleware/auth.js
const User = require("../models/User.js");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Format: Bearer <token>
        console.log("Received Token:", token);
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const user = await User.findOne({ token });
        if (!user) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        if (user.isTokenExpired()) {
            return res.status(401).json({ message: "Token expired, please log in again" });
        }

        req.user = user; // attach the user object to the request
        next();
    } catch (err) {
        res.status(500).json({ message: "Authentication error", error: err.message });
    }
};

module.exports = authMiddleware;
