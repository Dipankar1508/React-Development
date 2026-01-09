const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
    {
        roomId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },

        createdBy: {
            type: String, // email
            required: true,
        },
        password: {
            type: String,
            required: true,
        },

        participants: [
            {
                type: String, // email
            }
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
