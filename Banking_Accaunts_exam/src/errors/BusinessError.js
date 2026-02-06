"use strict";

const AppError = require("./AppError");
const HTTP = require("../constants/httpStatus.constants");

class BusinessError extends AppError {
    constructor(message = "Business rule violation") {
        super(message, HTTP.CONFLICT);
    }
}

module.exports = BusinessError;