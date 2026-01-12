const HTTP_STATUS = require("../constants/httpStatus");
const MSG = require("../constants/responseMessages");

class AppError extends Error {
    constructor({ statusCode, message, details = null }) {
        super(message);

        this.name = "AppError";
        this.statusCode = Number.isInteger(statusCode)
            ? statusCode
            : HTTP_STATUS.INTERNAL_SERVER_ERROR;
        this.details = details;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
