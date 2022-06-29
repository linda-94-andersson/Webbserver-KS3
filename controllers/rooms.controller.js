const roomModel = require("../models/rooms.model");

async function roomJoin(room) {
    //old way to send data
    // const myURL = new URLSearchParams(`?username=&room=${room}`);
    // const newRoom = myURL.get('room');
    // console.log(myURL, " this is room query");
    // console.log(newRoom, " this is newRoom");

    if (!room) {
        return console.log("There must be a room");
    }
    try {
        const result = await roomModel.createRoom(room);
        console.log(result, " this is roomJoin result");
        return result;
    } catch (error) {
        console.error(error.message); 
        return console.log("Room could not be created");
    }
}

async function getAllRooms() {
    const result = await roomModel.getRooms();
    console.log(result, " this is getAllRooms result");
    if (!result) {
        return console.log("Could not get all rooms");
    }
    return result;
}

async function getRoom(room) {
    const result = await roomModel.getOneRoom(room);
    console.log(result, " this is getRoom result");
    if (!result) {
        return console.log("Could not get current room");
    }
    return result;
}

async function roomLeave(id) {
    const result = await roomModel.deleteRoom(id);
    console.log(result, " this is roomLeave result");
    if (!result) {
        return console.log("Room not deleted?");
    }
    return result;
}

module.exports = {
    roomJoin,
    getAllRooms,
    getRoom,
    roomLeave
}