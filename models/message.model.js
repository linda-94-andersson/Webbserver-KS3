const db = require("../config/db");

async function addMessage({ message, room_name, id_user, username, date }) {
    const sql = "INSERT INTO messages (message, room_name, id_user, username, date) VALUES ($1,$2,$3,$4,$5)";

    const result = await db.query(sql, [message, room_name, id_user, username, date]);

    return result.rows[0];
}

async function getMessages(roomId) {
    const sql = "SELECT * FROM messages WHERE room_name = $1";

    const result = await db.query(sql, [roomId]);

    return result.rows;
}

async function deleteMsg(roomId) {
    const sql = "DELETE FROM messages WHERE room_name = $1";

    const result = await db.query(sql, [roomId]);

    return result.rows;
}

module.exports = {
    addMessage,
    getMessages,
    deleteMsg
}