const sqlite3 = require("sqlite3").verbose();

const roomsStmt = `
CREATE TABLE IF NOT EXISTS rooms 
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room TEXT UNIQUE
)
`;

const usersStmt = `
CREATE TABLE IF NOT EXISTS users
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE
)
`;

const messagesStmt = `
CREATE TABLE IF NOT EXISTS messages
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT NOT NULL,
    id_room INTEGER,
    id_user INTEGER,
    CONSTRAINT fk_id_room
     FOREIGN KEY(id_room) 
     REFERENCES rooms(id)
     ON DELETE CASCADE,
    CONSTRAINT fk_id_user
     FOREIGN KEY(id_user)
     REFERENCES users(id)
     ON DELETE CASCADE
)
`;

const db = new sqlite3.Database("./db.sqlite", (error) => {
    if (error) {
        console.error(error.message);
        throw error;
    }
    db.run(roomsStmt, (error) => {
        if (error) {
            console.error(error.message);
            throw error;
        }
    });
    db.run(usersStmt, (error) => {
        if (error) {
            console.error(error.message);
            throw error;
        }
    });
    db.run(messagesStmt, (error) => {
        if (error) {
            console.error(error.message);
            throw error;
        }
    });
});

module.exports = db; 