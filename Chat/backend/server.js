require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const chatSocket = require("./socket/chatSocket");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const production = true;
if (production) {
    mongoose.connect(process.env.DB_URI);
} else {
    mongoose.connect(process.env.MONGO_URI);
}

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

chatSocket(io);

server.listen(5000, () => console.log("Backend running on 5000"));
