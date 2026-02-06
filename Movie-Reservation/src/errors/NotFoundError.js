"use strict";

const AppError = require("./AppError");
const HTTP = require("../constants/httpStatus");

class NotFoundError extends AppError {
    constructor(message) {
        super(message, HTTP.NOT_FOUND);
        this.name = "NotFoundError";
    }
}

module.exports = NotFoundError;
