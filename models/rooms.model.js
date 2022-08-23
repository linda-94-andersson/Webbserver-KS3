const db = require("../config/db");

function createRoom(room) {
    const sql = "INSERT INTO rooms (room) VALUES ($1)";

    return db.query(sql, room, function (error) {
        if (error) {
            console.error(error.message);
        }
        return room;
    });
}

function getRooms() {
    const sql = "SELECT * FROM rooms";

    return db.query(sql, function (error, rooms) {
        if (error) {
            console.error(error.message);
        }
        return rooms;
    });
}

function getOneRoom(room) {
    const sql = "SELECT * FROM rooms WHERE room = ?";

    return db.query(sql, room, function (error) {
        if (error) {
            console.error(error.message);
        }
        return room;
    });
}

function deleteRoom(room) {
    const sql = "DELETE FROM rooms WHERE room = ?";

    return db.query(sql, room, function (error) {
        if (error) {
            console.error(error.message);
        }
        return room;
    });
}

module.exports = {
    createRoom,
    getRooms,
    getOneRoom,
    deleteRoom
}