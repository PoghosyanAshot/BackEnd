"use strict";

const AppError = require("./AppError");
const HTTP = require("../constants/httpStatus");

class ForbiddenError extends AppError {
    constructor(message) {
        super(message, HTTP.FORBIDDEN);
        this.name = "ForbiddenError";
    }
}

module.exports = ForbiddenError;
