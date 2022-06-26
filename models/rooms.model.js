const db = require("../config/db");

function createRoom(id, room) {
    const sql = "INSERT INTO rooms (id, room) VALUES (?,?)";

    return new Promise((resolve, reject) => {
        db.run(sql, [id, room], function (error, rooms) {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve(rooms);
        });
    });
}

function getOneRoom(id) {
    const sql = "SELECT * FROM rooms WHERE id = ?";

    return new Promise((resolve, reject) => {
        db.get(sql, id, (error, room) => {
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
    getOneRoom,
    deleteRoom
}