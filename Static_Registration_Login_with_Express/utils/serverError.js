"use strict";

const { HTTP_STATUS, MSG } = require("../constants/constants");

class ServerError extends Error {
    constructor({ statusCode, message, errors = [], cause = null }) {
        super(message);

        this.name = "ServerError";
        this.statusCode = Number.isInteger(statusCode)
            ? statusCode
            : HTTP_STATUS.INTERNAL_SERVER_ERROR;
        this.errors = errors;
        this.cause = cause;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ServerError;
