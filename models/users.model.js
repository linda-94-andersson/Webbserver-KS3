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

function deleteUser(id) {
    const sql = "DELETE FROM users WHERE id = ?";

    return new Promise((resolve, reject) => {
        db.run(sql, id, (error) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve();
        });
    });
}

module.exports = {
    createUser,
    getAllUsers,
    getOneUser,
    deleteUser
}