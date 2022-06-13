const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'view')));

io.on("connection", socket => {
    socket.emit("message", "Welcome to ChatCod!");

    socket.broadcast.emit("message", "A user has joined the chat");

    socket.on("disconnect", () => {
        io.emit("message", "A user has left the chat");
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server runing on port http://localhost:${PORT}/`));