const db = require("../config/db");

function createRoom(room) {
    const sql = "INSERT INTO rooms (room) VALUES ($1)";

    return db.query(sql, room, function (error) {
        if (error) {
            console.error(error.message);
        }
        return room.rows;
    });
}

function getRooms() {
    const sql = "SELECT * FROM rooms";

    return db.query(sql, function (error, result) {
        if (error) {
            console.error(error.message);
        }
        return result.rows;
    });
}

function getOneRoom(room) {
    const sql = "SELECT * FROM rooms WHERE room = ?";

    return db.query(sql, room, function (error) {
        if (error) {
            console.error(error.message);
        }
        return room.rows;
    });
}

function deleteRoom(room) {
    const sql = "DELETE FROM rooms WHERE room = ?";

    return db.query(sql, room, function (error) {
        if (error) {
            console.error(error.message);
        }
        return room.rows;
    });
}

module.exports = {
    createRoom,
    getRooms,
    getOneRoom,
    deleteRoom
}