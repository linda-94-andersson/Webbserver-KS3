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
    id_room TEXT,
    id_user TEXT,
    username TEXT,
    date TEXT,
    FOREIGN KEY(id_room) 
    REFERENCES rooms(room)
    ON DELETE CASCADE,
    FOREIGN KEY(id_user)
    REFERENCES users(id)
);
`;

const db = new sqlite3.Database("./db.sqlite", (error) => {
    if (error) {
        console.error(error.message);
        throw error;
    }
    // db.exec("PRAGMA foreign_keys=ON", (err) => {
    //     if (err) console.error(err.message);
    // });
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