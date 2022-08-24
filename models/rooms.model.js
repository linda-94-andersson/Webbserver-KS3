const db = require("../config/db");

async function createRoom(room) {
    const sql = "INSERT INTO rooms (room) VALUES ($1)";

    const result = await db.query(sql, [room]);

    return result.rows[0];
}

async function getRooms() {
    const sql = "SELECT * FROM rooms";

    const result = await db.query(sql);

    return result.rows;
}

async function getOneRoom(room) {
    const sql = "SELECT * FROM rooms WHERE room = ?";

    const result = await db.query(sql, [room]);

    return result.rows[0];
}

async function deleteRoom(room) {
    const sql = "DELETE FROM rooms WHERE room = ?";

    const result = await db.query(sql, [room]);

    return result.rows[0];
}

module.exports = {
    createRoom,
    getRooms,
    getOneRoom,
    deleteRoom
}