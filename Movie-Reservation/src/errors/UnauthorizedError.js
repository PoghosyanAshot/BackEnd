"use strict";

const AppError = require("./AppError");
const HTTP = require("../constants/httpStatus");

class UnauthorizedError extends AppError {
    constructor(message) {
        super(message, HTTP.UNAUTHORIZED);
        this.name = "UnauthorizedError";
    }
}

module.exports = UnauthorizedError;
