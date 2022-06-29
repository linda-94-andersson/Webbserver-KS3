const userModel = require("../models/users.model");

async function userJoin(id, username) {
    //old way to send data
    // const myURL = new URLSearchParams(`?username=${username}&room=`);
    // const newUser = myURL.get('username');
    // console.log(newUser, " this is newUser");

    if (!res) {
        return console.log("There must be a user");
    }
    try {
        const result = await userModel.createUser(id, username);
        console.log(result, " this is userJoin result");
        return result;
    } catch (error) {
        return console.log("User could not be created");
    }
}

async function getUsers() {
    const result = await userModel.getAllUsers();
    console.log(result, " this is getAllUsers result");
    if (!result) {
        return console.log("Could not get all users");
    }
    return result;
}

async function getCurrentUser(id) {
    const result = await userModel.getOneUser(id);
    console.log(result, " this is getCurrentUser result");
    if (!result) {
        return console.log("Could not get current user");
    }
    return result; 
}

async function userLeave(id) {
    const result = await userModel.deleteUser(id);
    console.log(result, " this is userLeave result");
    if (!result) {
        return console.log("User could not leave :/");
    }
    return result; 
}

module.exports = {
    userJoin,
    getUsers,
    getCurrentUser,
    userLeave
}