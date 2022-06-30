const userModel = require("../models/users.model");
//console.logs(result) are only for dev and error handling

async function userJoin(id, username) {
    if (!username) {
        return console.log("There must be a user");
    }
    try {
        const result = await userModel.createUser(id, username);
        // console.log(result, " this is userJoin result");
        return result;
    } catch (error) {
        return console.log("User could not be created");
    }
}

async function getUsers() {
    const result = await userModel.getAllUsers();
    // console.log(result, " this is getAllUsers result");
    if (!result) {
        return console.log("Could not get all users");
    }
    return result;
}

async function getCurrentUser(id) {
    const result = await userModel.getOneUser(id);
    // console.log(result, " this is getCurrentUser result");
    if (!result) {
        return console.log("Could not get current user");
    }
    return result;
}

async function updateRoom(room, username) {
    const result = await userModel.updateActiveRoom(room, username);
    // console.log(result, " this is updateRoom result");
    
    //dont need to stop when undefiend, only read to db
    // if (!result) {
    //     return console.log("Could not update room");
    // }
    return result;
}

async function getUinRoom(room) {
    const result = await userModel.getUserInRoom(room);
    // console.log(result, " this is getUinRoom result");
    if (!result) {
        return console.log("Could not get users in room");
    }
    return result;
}

async function userLeave(id) {
    const result = await userModel.deleteUser(id);
    // console.log(result, " this is userLeave result");
    if (!result) {
        return console.log("User could not leave :/");
    }
    return result;
}

module.exports = {
    userJoin,
    getUsers,
    getCurrentUser,
    updateRoom,
    getUinRoom,
    userLeave
}