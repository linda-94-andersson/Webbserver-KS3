const roomModel = require("../models/rooms.model");
//console.logs(result) are only for dev and error handling

async function roomJoin(room) {
    if (!room) {
        return console.log("There must be a room");
    }
    try {
        const result = await roomModel.createRoom(room);
        // console.log(result, " this is roomJoin result");
        return result;
    } catch (error) {
        console.error(error.message); 
        return console.log("Room could not be created");
    }
}

async function getAllRooms() {
    const result = await roomModel.getRooms();
    // console.log(result, " this is getAllRooms result");
    if (!result) {
        return console.log("Could not get all rooms");
    }
    return result;
}

async function getRoom(room) {
    const result = await roomModel.getOneRoom(room);
    // console.log(result, " this is getRoom result");
    if (!result) {
        return console.log("Could not get current room");
    }
    return result;
}

async function roomLeave(room) {
    const result = await roomModel.deleteRoom(room);
    // console.log(result, " this is roomLeave result");
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