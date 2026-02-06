"use strict";

const fs = require("fs");
const path = require("path");

const LOG_DIR = path.join(__dirname, "../../logs");
const ACCESS_LOG = path.join(LOG_DIR, "access.log");

if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR);
}

const loggerMiddleware = (req, res, next) => {
    const time = new Date().toISOString();

    const log = `
[${time}]
${req.method} ${req.originalUrl}
IP: ${req.ip}
`;

    fs.appendFile(ACCESS_LOG, log, (err) => {
        if (err) {
            console.error("ACCESS LOGGER FAILED:", err);
        }
    });

    console.log(`${req.method} ${req.originalUrl}`);
    next();
};

module.exports = loggerMiddleware;