"use strict";

const fs = require("fs");
const path = require("path");

const LOG_DIR = path.join(__dirname, "../../logs");
const ERROR_LOG = path.join(LOG_DIR, "error.log");

if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR);
}

exports.logError = (err, req = null) => {
    const time = new Date().toISOString();

    const requestInfo = req
        ? `
Request:
  Method: ${req.method}
  URL: ${req.originalUrl}
  IP: ${req.ip}
  RequestID: ${req.id || "N/A"}
`
        : "";

    const message = `
==============================
TIME: ${time}
TYPE: ${err.name || "Error"}
MESSAGE: ${err.message}
STACK:
${err.stack}
${requestInfo}
==============================
`;

    fs.appendFile(ERROR_LOG, message, (err) => {
        if (err) {
            console.error("LOGGER FAILED TO WRITE FILE:", err);
        }
    });

    console.error(message);
};
