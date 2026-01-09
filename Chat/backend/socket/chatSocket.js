const Message = require("../models/Message");
const Room = require("../models/Room");
const auth = require("../middleware/authMiddleware");
const bcrypt = require("bcrypt");

module.exports = (io) => {

    // 🔐 AUTH MIDDLEWARE
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            const user = await auth(token);

            if (!user) return next(new Error("Unauthorized"));

            socket.user = user; // { email }
            next();
        } catch (err) {
            next(new Error("Unauthorized"));
        }
    });

    io.on("connection", (socket) => {

        // 🚪 JOIN ROOM
        socket.on("join", async ({ roomId, password }) => {
            try {
                let room = await Room.findOne({ roomId });

                if (!room) {
                    const hash = await bcrypt.hash(password, 10);

                    room = await Room.create({
                        roomId,
                        createdBy: socket.user.email,
                        password: hash,
                        participants: [socket.user.email],
                    });
                } else {
                    const isValid = await bcrypt.compare(password, room.password);

                    if (!isValid) {
                        socket.emit("joinError", "Invalid room password");
                        return;
                    }

                    // if (!room.participants.includes(socket.user.email)) {
                    //     room.participants.push(socket.user.email);
                    //     await room.save();
                    // }
                    await Room.updateOne(
                        { roomId },
                        { $addToSet: { participants: socket.user.email } }
                    );
                }

                socket.join(roomId);
                socket.emit("me", socket.user.email);

                const messages = await Message
                    .find({ room: roomId })
                    .sort({ createdAt: 1 });

                socket.emit("roomMessages", messages);

            } catch (err) {
                if (err.code === 11000) {
                    try {
                        const room = await Room.findOne({ roomId });
                        if (!room) {
                            socket.emit("joinError", "Room not found");
                            return;
                        }

                        const isValid = await bcrypt.compare(password, room.password);
                        if (!isValid) {
                            socket.emit("joinError", "Invalid room password");
                            return;
                        }

                        if (!room.participants.includes(socket.user.email)) {
                            room.participants.push(socket.user.email);
                            await room.save();
                        }

                        socket.join(roomId);
                        socket.emit("me", socket.user.email);

                        const messages = await Message
                            .find({ room: roomId })
                            .sort({ createdAt: 1 });

                        socket.emit("roomMessages", messages);
                    } catch (innerErr) {
                        console.error(innerErr);
                        socket.emit("joinError", "Something went wrong");
                    }
                } else {
                    console.error(err);
                    socket.emit("joinError", "Something went wrong");
                }
            }
        });


        // 💬 SEND MESSAGE
        socket.on("message", async (data) => {
            if (!data.text?.trim()) return;
            if (!socket.rooms.has(data.room)) return;

            const msg = await Message.create({
                room: data.room,
                sender: socket.user.email,
                text: data.text,
            });

            io.to(data.room).emit("message", msg);
        });
    });
};
