// ======================
//  ADMIN AUTH MIDDLEWARE
// ======================

const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const adminAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "admin") throw new Error();
        next();
    } catch {
        return res.status(401).json({ message: "Unauthorized Admin Access" });
    }
};

module.exports = adminAuth;