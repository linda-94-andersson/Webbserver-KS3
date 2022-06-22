const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);
const cors = require("cors");

const formatMessage = require("./utils/messages");
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require("./utils/users");
const logger = require("./middlewares/logger");


app.use(cors());
app.use(logger);

app.use(express.static(path.join(__dirname, 'view')));

io.on("connection", socket => {
    socket.on("joinRoom", ({ username, room }) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        socket.emit("message", formatMessage("Admin", "Welcome to THECHAT!"));

        socket.broadcast.to(user.room).emit("message", formatMessage("Admin", `${user.username} has joined the chat`));

        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit("message", formatMessage(user.username, msg));
    });

    socket.on("disconnect", () => {
        const user = userLeave(socket.id);
        if (user) {
            io.to(user.room).emit("message", formatMessage("Admin", `${user.username} has left the chat`));
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
});

const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server runing on port http://localhost:${PORT}/`));