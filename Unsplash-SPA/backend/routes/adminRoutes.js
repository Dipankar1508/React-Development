const express = require("express");
const router = express.Router();
const auth = require("../middleware/userMiddleware");
const Product = require("../models/Product");
const User = require("../models/User");

// Admin stats route
router.get("/stats", auth, async (req, res) => {
    try {
        // only admin allowed
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Admin only" });
        }

        const totalImages = await Product.countDocuments();
        const totalUsers = await User.countDocuments();

        // last 24 hours
        const last24h = new Date();
        last24h.setHours(last24h.getHours() - 24);

        const recentUploads = await Product.countDocuments({
            createdAt: { $gte: last24h }
        });

        // category stats
        const categoryStats = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
        ]);

        res.status(200).json({
            totalImages,
            totalUsers,
            recentUploads,
            categoryStats
        });

    } catch (err) {
        res.status(500).json({ message: "Error fetching stats" });
    }
});

// GET all users except admins
router.get("/users", auth, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Admin only" });
        }

        const users = await User.find({ role: { $ne: "admin" } })
            .select("-password");

        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Error fetching users" });
    }
});


// DELETE user (except admin)
router.delete("/users/:id", auth, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Admin only" });
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role === "admin") {
            return res.status(403).json({ message: "Cannot delete admin" });
        }

        await User.findByIdAndDelete(req.params.id);

        res.json({ message: "User deleted" });

    } catch (err) {
        res.status(500).json({ message: "Error deleting user" });
    }
});

module.exports = router;
