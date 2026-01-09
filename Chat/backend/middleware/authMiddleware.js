const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("email");
        return user; // { _id, email }
    } catch {
        return null;
    }
};
