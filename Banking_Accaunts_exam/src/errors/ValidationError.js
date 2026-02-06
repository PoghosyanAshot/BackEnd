"use strict";

const AppError = require("./AppError");
const HTTP = require("../constants/httpStatus.constants");

class ValidationError extends AppError {
    constructor(message = "Validation error") {
        super(message, HTTP.BAD_REQUEST);
    }
}

module.exports = ValidationError;
