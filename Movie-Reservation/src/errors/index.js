"use strict";

const errors = Object.freeze({
    AppError: require("./AppError"),
    NotFoundError: require("./NotFoundError"),
    ValidationError: require("./ValidationError"),
    UnauthorizedError: require("./UnauthorizedError"),
    ForbiddenError: require("./ForbiddenError"),
    ConflictError: require("./ConflictError"),
    BadRequestError: require("./BadRequestError"),
});

module.exports = errors;
