"use strict";

const AppError = require("./AppError");
const HTTP = require("../constants/httpStatus.constants");

class DatabaseError extends AppError {
    constructor(message = "Database operation failed") {
        super(message, HTTP.INTERNAL_SERVER_ERROR);
    }
}

module.exports = DatabaseError;