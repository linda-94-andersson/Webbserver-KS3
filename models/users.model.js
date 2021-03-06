const db = require("../config/db");

function createUser(id, username) {
    const sql = "INSERT INTO users (id, username) VALUES (?,?)";

    return new Promise((resolve, reject) => {
        db.run(sql, [id, username], function (error, user) {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve(user);
        });
    });
}

function getAllUsers() {
    const sql = "SELECT * FROM users";

    return new Promise((resolve, reject) => {
        db.all(sql, (error, users) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve(users);
        })
    })
}


function getOneUser(id) {
    const sql = "SELECT * FROM users WHERE id = ?";

    return new Promise((resolve, reject) => {
        db.get(sql, id, (error, user) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve(user);
        });
    });
}

function updateActiveRoom(room, username) {
    const sql = "UPDATE users SET active_room = ? WHERE username = ?"

    return new Promise((resolve, reject) => {
        db.run(sql, [room, username], (error, user) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve(user);
        });
    });
}

function getUserInRoom(room) {
    const sql = "SELECT username, active_room FROM users WHERE active_room = ?";

    return new Promise((resolve, reject) => {
        db.all(sql, room, (error, user) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve(user);
        });
    });
}

function deleteUser(id) {
    const sql = "DELETE FROM users WHERE id = ?";

    return new Promise((resolve, reject) => {
        db.run(sql, id, (error) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve(id);
        });
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