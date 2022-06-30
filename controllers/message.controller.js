const msgModel = require("../models/message.model");
//console.logs(result) are only for dev and error handling

async function createMsg(message) {
    if (!message) {
        return console.log("There must be a message");
    }
    try {
        const result = await msgModel.addMessage(message);
        // console.log(result, " this is createMsg result");
        return result;
    } catch (error) {
        console.error(error.message);
        throw error;
        return console.log("Message could not be created");
    }
}

async function getAllMsg(roomId) {
    const result = await msgModel.getMessages(roomId);
    // console.log(result, " this is getMessages result");
    if (!result) {
        return console.log("Could not get all messages");
    }
    return result;
}

async function deleteMessages(roomId) {
    const result = await msgModel.deleteMsg(roomId);
    // console.log(result, " this is dleteMsg result");
    if (!roomId) {
        return console.log("No Id found");
    }
    return result;
}

module.exports = {
    createMsg,
    getAllMsg,
    deleteMessages
}