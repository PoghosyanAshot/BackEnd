"use strict";

const AppError = require("./AppError");
const HTTP = require("../constants/httpStatus.constants");

class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
        super(message, HTTP.NOT_FOUND);
    }
}

module.exports = NotFoundError;