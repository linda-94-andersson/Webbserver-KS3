const userModel = require("../models/users.model");

async function userJoin(req, res) {
    //old way to send data
    // const myURL = new URLSearchParams(`?username=${username}&room=`);
    // const newUser = myURL.get('username');
    // console.log(newUser, " this is newUser");

    if (!res) {
        return console.log("There must be a user");
    }
    try {
        const result = await userModel.createUser(req, res);
        console.log(result, " this is userJoin result");
    } catch (error) {
        return console.log("User could not be created");
    }
}

async function getCurrentUser(req, res) {
    const result = await userModel.getOneUser(req);
    console.log(result, " this is getCurrentUser result");
    if (!result) {
        return console.log("Could not get current user");
    }
}

async function userLeave(req, res) {
    const result = await userModel.deleteUser(req);
    console.log(result, " this is userLeave result");
    if (!result) {
        return console.log("User could not leave :/");
    }
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave
}