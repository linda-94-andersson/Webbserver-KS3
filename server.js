const express = require("express");
const app = express();
// const path = require("path");
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// Old server io setup
// const socketio = require("socket.io");
// const io = socketio(server);

const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "DELETE"]
    }
});

const logger = require("./middlewares/logger");
const formatMessage = require("./utils/messages");
const { userJoin, getUsers, getCurrentUser, userLeave } = require("./controllers/users.controller");
const { getRoom, getAllRooms, roomJoin, roomLeave } = require("./controllers/rooms.controller");

app.use(cors());
app.use(bodyParser.json());
app.use(logger);
app.use(morgan("dev"));

// app.use(express.static(path.join(__dirname, 'view')));

let messages = [];

io.on("connection", socket => {
    socket.on("createRoom", async (room) => {
        const roomName = await getRoom(room);
        const allRoom = await getAllRooms();

        const checkRoom = allRoom.filter((check) => {
            return check.room === room;
        })
        if (checkRoom.length) {
            return console.log("Room already exist");
        }
        const newRoom = await roomJoin(room);

        socket.emit("roomCreated", roomName);
    });

    socket.on("getAllRooms", async () => {
        const allRooms = await getAllRooms();

        socket.emit("Rooms", allRooms);
    });

    socket.on("joinRoom", async (room) => {
        const user = await getCurrentUser(socket.id);
        // const newRoom = await roomJoin(socket.id, room);
        const roomName = await getRoom(socket.id);
        socket.join(user, roomName);
        socket.emit("joinedRoom", room);
        //socket.leave(room); 
        socket.emit("adminMsg", formatMessage("Admin", "Welcome to THECHAT!"));
        socket.broadcast.to(roomName).emit("adminMsg", formatMessage("Admin", `${user} has joined the chat`));

        // io.to(roomName).emit("roomUsers", {
        //     room: roomName,
        //     users: await getCurrentUser(socket.id)
        // });
    });

    socket.on("createUser", async (username) => {
        const newUser = await userJoin(socket.id, username);
        const user = await getCurrentUser(socket.id);

        socket.emit("username", user);
    });

    socket.on("getAllUsers", async () => {
        const allUsers = await getUsers();

        socket.emit("Users", allUsers);
    });

    socket.on("deleteUser", async () => {
        const user = await userLeave(socket.id);
        const roomName = await getRoom(socket.id);

        io.to(roomName).emit("adminMsg", formatMessage("Admin", `${user} has left the chat`));

        socket.emit("userLeft", user);
    })

    socket.on("chatMessage", async (message) => {
        const user = await getCurrentUser(socket.id);
        const roomName = await getRoom(socket.id);

        messages.push(message);
        // const addMsg = newMsg(socket.id); 
        console.log(messages, " this is messages");
        io.to(roomName).emit("message", messages);

        // formatMessage(user, message)
    });

    socket.on("disconnect", async () => {
        const user = await getCurrentUser(socket.id);
        const roomName = await getRoom(socket.id);
        if (user) {
            io.to(roomName).emit("adminMsg", formatMessage("Admin", `${user} has left the chat`));
            io.to(roomName).emit("roomUsers", {
                room: roomName,
                users: await getCurrentUser(socket.id)
            });
        }
    });

    socket.on("error", (error) => {
        console.error(error, " this is io error");
    });
});


const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server runing on port http://localhost:${PORT}/`));