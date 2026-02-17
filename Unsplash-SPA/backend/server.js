require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const AuthRoutes = require("./routes/authRoutes");
const ProductRoutes = require("./routes/productRoutes")
const AdminRoutes = require("./routes/adminRoutes");


const app = express();

app.use(cors());
app.use(express.json());

// serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.use("/api/auth", AuthRoutes);
app.use("/api/gallery", ProductRoutes);
app.use("/api/admin", AdminRoutes);

app.get("/", (req, res) => {
    res.send("Gallery API running");
});

app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
);
