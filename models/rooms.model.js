const db = require("../config/db");

function createRoom(room) {
    const sql = "INSERT INTO rooms (room) VALUES (?)";
    return new Promise((resolve, reject) => {
        db.run(sql, room, function (error) {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve(room);
        });
    });
}

function getRooms() {
    const sql = "SELECT * FROM rooms";

    return new Promise((resolve, reject) => {
        db.all(sql, (error, rooms) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve(rooms);
        })
    })
}

function getOneRoom(room) {
    const sql = "SELECT * FROM rooms WHERE room = ?";

    return new Promise((resolve, reject) => {
        db.get(sql, room, (error) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve(room);
        });
    });
}

function deleteRoom(id) {
    const sql = "DELETE FROM rooms WHERE id = ?";

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
    createRoom,
    getRooms,
    getOneRoom,
    deleteRoom
}