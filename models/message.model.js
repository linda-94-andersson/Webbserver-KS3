const db = require("../config/db");

function addMessage({ message, room_name, id_user, username, date }) {
    const sql = "INSERT INTO messages (message, room_name, id_user, username, date) VALUES ($1,$2,$3,$4,$5)";

    return db.query(sql, [message, room_name, id_user, username, date], function (error) {
        if (error) {
            console.error(error.message);
        }
        return;
    });
}

function getMessages(roomId) {
    const sql = "SELECT * FROM messages WHERE room_name = ?";

    return db.query(sql, roomId, function (error, room) {
        if (error) {
            console.error(error.message);
        }
        return room;
    });
}

function deleteMsg(roomId) {
    const sql = "DELETE FROM messages WHERE room_name = ?";

    return db.query(sql, roomId, function (error, room) {
        if (error) {
            console.error(error.message);
        }
        return room;
    });
}



module.exports = {
    addMessage,
    getMessages,
    deleteMsg
}