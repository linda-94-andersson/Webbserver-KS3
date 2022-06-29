const db = require("../config/db");

function addMessage({ message, id_room, id_user, username, date }) {
    const sql = "INSERT INTO messages (message, id_room, id_user, username, date) VALUES (?,?,?,?,?)";

    return new Promise((resolve, reject) => {
        db.run(sql, [message, id_room, id_user, username, date], (error) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve();
        });
    });
}

function getMessages(roomId) {
    const sql = "SELECT * FROM messages WHERE id_room = ?";

    return new Promise((resolve, reject) => {
        db.all(sql, roomId, (error, room) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve(room);
        })
    })
}


module.exports = {
    addMessage,
    getMessages
}