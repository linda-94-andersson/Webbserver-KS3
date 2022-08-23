const db = require("../config/db");

function createUser(id, username) {
    const sql = "INSERT INTO users (id, username) VALUES ($1,$2)";

    return db.query(sql, [id, username], function (error, user) {
        if (error) {
            console.error(error.message);
        }
        return user;
    });
}

function getAllUsers() {
    const sql = "SELECT * FROM users";

    return db.query(sql, function (error, users) {
        if (error) {
            console.error(error.message);
        }
        return users;
    });
}


function getOneUser(id) {
    const sql = "SELECT * FROM users WHERE id = ?";

    return db.query(sql, id, function (error, user) {
        if (error) {
            console.error(error.message);
        }
        return user;
    });
}

function updateActiveRoom(room, username) {
    const sql = "UPDATE users SET active_room = ? WHERE username = ?"

    return db.query(sql, [room, username], function (error, user) {
        if (error) {
            console.error(error.message);
        }
        return user;
    });
}

function getUserInRoom(room) {
    const sql = "SELECT username, active_room FROM users WHERE active_room = ?";

    return db.query(sql, room, function (error, user) {
        if (error) {
            console.error(error.message);
        }
        return user;
    });
}

function deleteUser(id) {
    const sql = "DELETE FROM users WHERE id = ?";

    return db.query(sql, id, function (error) {
        if (error) {
            console.error(error.message);
        }
        return id;
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