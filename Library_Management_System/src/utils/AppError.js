"use strict";

class AppError extends Error {
    constructor({ statusCode, message, cause = null }) {
        super(message, { cause });

        this.statusCode = statusCode;
        this.cause = cause;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
