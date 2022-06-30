const sqlite3 = require("sqlite3").verbose();

const roomsStmt = `
CREATE TABLE IF NOT EXISTS rooms 
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room TEXT UNIQUE
);
`;

const usersStmt = `
CREATE TABLE IF NOT EXISTS users
(
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE,
    active_room TEXT
);
`;

const messagesStmt = `
CREATE TABLE IF NOT EXISTS messages
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT NOT NULL,
    room_name TEXT,
    id_user TEXT,
    username TEXT,
    date TEXT
);
`;

const db = new sqlite3.Database("./db.sqlite", async (error) => {
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