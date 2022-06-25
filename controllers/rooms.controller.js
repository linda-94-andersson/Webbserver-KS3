const roomModel = require("../models/rooms.model");

async function roomJoin(req, res) {
    //old way to send data
    // const myURL = new URLSearchParams(`?username=&room=${room}`);
    // const newRoom = myURL.get('room');
    // console.log(myURL, " this is room query");
    // console.log(newRoom, " this is newRoom");

    if (!res) {
        return console.log("There must be a room");
    }
    try {
        const result = await roomModel.createRoom(req, res);
        console.log(result, " this is roomJoin result");
    } catch (error) {
        return console.log("Room could not be created");
    }
}

async function getRoom(req, res) {
    const result = await roomModel.getOneRoom(req);
    console.log(result, " this is getRoom result");
    if (!result) {
        return console.log("Could not get current room");
    }
}

async function roomLeave(req, res) {
    const result = await roomModel.deleteRoom(req);
    console.log(result, " this is roomLeave result");
    if (!result) {
        return console.log("Room not deleted?");
    }
}

module.exports = {
    roomJoin,
    getRoom,
    roomLeave
}