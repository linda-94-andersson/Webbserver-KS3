const db = require("../config/db");

async function createUser(id, username) {
    const sql = "INSERT INTO users (id, username) VALUES ($1,$2)";

    const result = await db.query(sql, [id, username]);

    return result.rows[0];
}

async function getAllUsers() {
    const sql = "SELECT * FROM users";

    const result = await db.query(sql);

    return result.rows;
}


async function getOneUser(id) {
    const sql = "SELECT * FROM users WHERE id = $1";

    const result = await db.query(sql, [id]);

    return result.rows[0];
}

async function updateActiveRoom(room, username) {
    const sql = "UPDATE users SET active_room = $1 WHERE username = $2"

    const result = await db.query(sql, [room, username]);

    return result.rows[0];
}

async function getUserInRoom(room) {
    const sql = "SELECT username, active_room FROM users WHERE active_room = $1";

    const result = await db.query(sql, [room]);

    return result.rows[0];
}

async function deleteUser(id) {
    const sql = "DELETE FROM users WHERE id = $1";

    const result = await db.query(sql, [id]);

    return result.rows[0];
}

module.exports = {
    createUser,
    getAllUsers,
    getOneUser,
    updateActiveRoom,
    getUserInRoom,
    deleteUser
}