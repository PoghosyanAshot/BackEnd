"use strict";

const AppError = require("./AppError");
const HTTP = require("../constants/httpStatus");

class ValidationError extends AppError {
    constructor(message) {
        super(message, HTTP.BAD_REQUEST);
        this.name = "ValidationError";
    }
}

module.exports = ValidationError;
