const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const formRoutes = require("./routes/formRoutes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
    .connect("mongodb://localhost:27017/Form")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

app.use("/form", formRoutes);

app.listen(3000, () => {
    console.log("http://localhost:3000");
});