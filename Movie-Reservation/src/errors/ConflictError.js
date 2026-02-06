"use strict";

const AppError = require("./AppError");
const HTTP = require("../constants/httpStatus");

class ConflictError extends AppError {
    constructor(message) {
        super(message, HTTP.CONFLICT);
        this.name = "ConflictError";
    }
}

module.exports = ConflictError;
