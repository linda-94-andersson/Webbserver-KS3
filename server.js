const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// const { Server } = require("socket.io");
// const io = new Server(server, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST", "DELETE"]
//     }
// });

const logger = require("./middlewares/logger");
const formatMessage = require("./utils/messages");
const { userJoin, getCurrentUser, userLeave } = require("./controllers/users.controller");
const { getRoom, roomJoin, roomLeave } = require("./controllers/rooms.controller");

app.use(cors());
app.use(bodyParser.json());
app.use(logger);
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, 'view')));

io.on("connection", socket => {
    socket.on("joinRoom", ({ username, room }) => {
        const newUser = userJoin(socket.id, username);
        const user = getCurrentUser(socket.id);
        const newRoom = roomJoin(socket.id, room);
        const roomName = getRoom(socket.id);

        socket.join(newUser.username, newRoom.room);

        socket.emit("message", formatMessage("Admin", "Welcome to THECHAT!"));

        socket.broadcast.to(roomName.room).emit("message", formatMessage("Admin", `${user.username} has joined the chat`));

        io.to(roomName.room).emit("roomUsers", {
            room: roomName.room,
            users: getCurrentUser(socket.id)
        });
    });

    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id);
        const roomName = getRoom(socket.id);
        // const addMsg = newMsg(socket.id); 
        io.to(roomName.room).emit("message", formatMessage(user.username, msg));
    });

    socket.on("disconnect", () => {
        const user = userLeave(socket.id);
        const roomName = getRoom(socket.id);
        if (user) {
            io.to(roomName.room).emit("message", formatMessage("Admin", `${user.username} has left the chat`));
            io.to(roomName.room).emit("roomUsers", {
                room: roomName.room,
                users: getCurrentUser(socket.id)
            });
        }
    });
});

const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server runing on port http://localhost:${PORT}/`));