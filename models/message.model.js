const db = require("../config/db");

function addMessage({ message, room_name, id_user, username, date }) {
    const sql = "INSERT INTO messages (message, room_name, id_user, username, date) VALUES (?,?,?,?,?)";

    return new Promise((resolve, reject) => {
        db.run(sql, [message, room_name, id_user, username, date], (error) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve();
        });
    });
}

function getMessages(roomId) {
    const sql = "SELECT * FROM messages WHERE room_name = ?";

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

function deleteMsg(roomId) {
	const sql = "DELETE FROM messages WHERE room_name = ?";
	return new Promise((resolve, reject) => {
		db.run(sql, roomId, (error, room) => {
			if (error) {
				console.error(error.message);
				reject(error);
			}
			resolve(room);
		});
	});
}



module.exports = {
    addMessage,
    getMessages,
    deleteMsg
}