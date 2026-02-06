"use strict";

const winston = require("winston");
const path = require("path");
const fs = require("fs");

const logDir = path.join(process.cwd(), "logs");

const prettyJsonFormat = winston.format.printf(({ level, message, timestamp, stack }) => {
    const logObject = {
        timestamp,
        level,
        message,
        stack,
    };

    if (stack) {
        logObject.stack = stack.split("\n");
    }

    return JSON.stringify(logObject, null, 4);
});

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const logger = winston.createLogger({
    level: "info",

    format: winston.format.combine(
        winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        winston.format.errors({ stack: true }),
        prettyJsonFormat
    ),

    transports: [
        new winston.transports.File({
            filename: path.join(logDir, "error.log"),
            level: "error",
        }),

        new winston.transports.File({
            filename: path.join(logDir, "combined.log"),
        }),
    ],
});

if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), prettyJsonFormat),
        })
    );
}

module.exports = logger;
