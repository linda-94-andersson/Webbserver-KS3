const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const bodyParser = require("body-parser");
const moment = require("moment");

const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "DELETE"]
    }
});

const logger = require("./middlewares/logger");
const formatMessage = require("./utils/messages");

const { userJoin, getUsers, getCurrentUser, userLeave, updateRoom, getUinRoom, } = require("./controllers/users.controller");
const { getRoom, getAllRooms, roomJoin, roomLeave } = require("./controllers/rooms.controller");
const { createMsg, getAllMsg, deleteMessages } = require("./controllers/message.controller");

app.use(cors());
app.use(bodyParser.json());
app.use(logger);

io.use((socket, next) => {
    socket.on("chatMessage", (data) => {
        if (!data.message) {
            return console.log("Nothign to logg");
        }
        logger(data);
    });
    next();
});

io.on("connection", socket => {
    socket.on("createRoom", async (room) => {
        const allRoom = await getAllRooms();

        const checkRoom = allRoom.filter((check) => {
            return check.room === room;
        })
        if (checkRoom.length) {
            return console.log("Room already exist");
        }
        const newRoom = await roomJoin(room);

        socket.emit("roomCreated", room);
    });

    socket.on("getAllRooms", async () => {
        const allRooms = await getAllRooms();

        socket.emit("rooms", allRooms);
    });

    socket.on("joinRoom", async ({ room, username }) => {
        // const user = await getCurrentUser(socket.id);
        // const roomName = await getRoom(room);

        socket.join(room);
        socket.emit("joinedRoom", room);
        // socket.emit("adminMsg", formatMessage("Admin", "Welcome to THECHAT!"));
        // socket.broadcast.to(roomName).emit("adminMsg", formatMessage("Admin", `${user} has joined the chat`));
    });

    socket.on("getActiveUsers", async ({ room, username }) => {
        await updateRoom(room, username);
        const activeUsers = await getUinRoom(room);
        socket.emit("usersActive", activeUsers);
    });

    socket.on("deleteRoom", async (room) => {
        await deleteMessages(room);
        await roomLeave(room);
        socket.leave(room);

        // await deleteMessages(roomName);
        // const updatedRooms = await getAllRooms();
        // io.emit("deleted_room", updatedRooms);

        socket.emit("roomDeleted", room);
    });

    socket.on("createUser", async (username) => {
        const allUsers = await getUsers();

        const checkUser = allUsers.filter((check) => {
            return check.username === username;
        });
        if (checkUser.length) {
            socket.emit("username", "error");
            return console.log("User already exist");
        }
        const newUser = await userJoin(socket.id, username);

        socket.emit("username", username);
    });

    socket.on("getAllUsers", async () => {
        const allUsers = await getUsers();

        socket.emit("users", allUsers);
    });


    socket.on("deleteUser", async () => {
        const user = await userLeave(socket.id);
        // const roomName = await getRoom(); //room?
        // socket.leave(room); //sätta upp room? 

        // io.to(roomName).emit("adminMsg", formatMessage("Admin", `${user} has left the chat`));
        socket.emit("userLeft", user);
    });

    socket.on("chatMessage", async (data) => {
        if (!data.roomName) {
            return console.log("Must be a room with message");
        }

        const getBefore = await getAllMsg(data.roomName);
        socket.emit("getAllMessages", getBefore);

        if (!data.message) {
            return console.log("Will not create empty messages");
        }
        const newMsg = {
            message: data.message,
            room_name: data.roomName,
            id_user: socket.id,
            username: data.username,
            date: moment().format("HH:mm"),
        }
        await createMsg(newMsg);
        const roomMessages = await getAllMsg(data.roomName);
        socket.emit("sentMessage", roomMessages);
    });

    socket.on("handle_typing", ({ typing, username, room }) => {
        socket.to(room).emit("is_typing", { typing, username });
    });

    socket.on("disconnect", async (room) => {
        const user = await getCurrentUser(socket.id);
        const roomName = await getRoom(room);
        if (user) {
            io.to(roomName).emit("adminMsg", formatMessage("Admin", `${user} has left the chat`));
        }
    });

    socket.on("error", (error) => {
        console.error(error, " this is io error");
    });
});


const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server runing on port http://localhost:${PORT}/`));