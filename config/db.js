// Converting from sqlite to Postgres
// const sqlite3 = require("sqlite3").verbose();
const { Client } = require("pg");


const roomsStmt = `
CREATE TABLE IF NOT EXISTS rooms 
(
    id SERIAL PRIMARY KEY, 
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
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    room_name TEXT,
    id_user TEXT,
    username TEXT,
    date TEXT
);
`;

// const db = new sqlite3.Database("./db.sqlite", async (error) => {
//     if (error) {
//         console.error(error.message);
//         throw error;
//     }
//     db.run(roomsStmt, (error) => {
//         if (error) {
//             console.error(error.message);
//             throw error;
//         }
//     });
//     db.run(usersStmt, (error) => {
//         if (error) {
//             console.error(error.message);
//             throw error;
//         }
//     });
//     db.run(messagesStmt, (error) => {
//         if (error) {
//             console.error(error.message);
//             throw error;
//         }
//     });
// });


const db = new Client({
    ssl: {
        rejectUnauthorized: false,
    },
    connectionString:
        process.env.DATABASE_URL,
});

db.connect();

db.query(roomsStmt, (error) => {
    if (error) {
        console.error(error.message);
        throw error;
    }
});
db.query(usersStmt, (error) => {
    if (error) {
        console.error(error.message);
        throw error;
    }
});
db.query(messagesStmt, (error) => {
    if (error) {
        console.error(error.message);
        throw error;
    }
});

module.exports = db; 