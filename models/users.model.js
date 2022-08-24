const db = require("../config/db");

function createUser(id, username) {
    const sql = "INSERT INTO users (id, username) VALUES ($1,$2)";

    return db.query(sql, [id, username], function (error, result) {
        if (error) {
            console.error(error.message);
        }
        return result.rows;
    });
}

function getAllUsers() {
    const sql = "SELECT * FROM users";

    return db.query(sql, function (error, result) {
        if (error) {
            console.error(error.message);
        }
        return result.rows;
    });
}


function getOneUser(id) {
    const sql = "SELECT * FROM users WHERE id = ?";

    return db.query(sql, id, function (error, result) {
        if (error) {
            console.error(error.message);
        }
        return result.rows;
    });
}

function updateActiveRoom(room, username) {
    const sql = "UPDATE users SET active_room = ? WHERE username = ?"

    return db.query(sql, [room, username], function (error, result) {
        if (error) {
            console.error(error.message);
        }
        return result.rows;
    });
}

function getUserInRoom(room) {
    const sql = "SELECT username, active_room FROM users WHERE active_room = ?";

    return db.query(sql, room, function (error, result) {
        if (error) {
            console.error(error.message);
        }
        return result.rows;
    });
}

function deleteUser(id) {
    const sql = "DELETE FROM users WHERE id = ?";

    return db.query(sql, id, function (error) {
        if (error) {
            console.error(error.message);
        }
        return id.rows;
    });
}

module.exports = {
    createUser,
    getAllUsers,
    getOneUser,
    updateActiveRoom,
    getUserInRoom,
    deleteUser
}