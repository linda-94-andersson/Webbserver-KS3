const fs = require("fs");
const chalk = require("chalk"); //Must be v:4.0 to work with require
const moment = require("moment");


const getActualRequestDurationInMilliseconds = start => {
    const NS_PER_SEC = 1e9; //  convert to nanoseconds
    const NS_TO_MS = 1e6; // convert to milliseconds
    const diff = process.hrtime(start);
    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

function logger(req, res, next) {
    const formatted_date = moment().format("YYYY-MM-DD HH:mm:ss");

    const start = process.hrtime();
    const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);

    res.on("finish", () => {
        //How to target msg? why dose it work first and then not? 
        const room = req.query.room; //params dosent work
        const user = req.query.username;
        const msg = req.body;

        const log = `
        [${chalk.blue(formatted_date)}]
        Room: ${room} - User: (${chalk.green(user)}): ${msg}
        ${chalk.red(durationInMilliseconds.toLocaleString() + "ms")}
        `;

        console.log(log);

        fs.appendFile("request_logs.txt", log + "\n", err => {
            if (err) {
                console.log(err);
            }
        });
    });
    console.log(req.query.username, req.query.room, " this is req.query in logger"); 
    next();
}

module.exports = logger;