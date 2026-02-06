"use strict";

const HTTP = require("../constants/httpStatus.constants");
const ERRORS = require("../constants/errorMessages.constants");
const response = require("../utils/responseFormatter");
const logger = require("../utils/logger");

const errorMiddleware = (err, req, res, next) => {
    const isOperational = err.isOperational;

    logger.error({
        message: err.message,
        stack: err.stack,
        url: req.originalUrl,
        method: req.method,
        isOperational,
    });

    if (isOperational) {
        return response.error(res, err.message, err.statusCode || HTTP.INTERNAL_SERVER_ERROR);
    }

    console.error("UNEXPECTED ERROR:", err);

    return response.error(res, ERRORS.INTERNAL_ERROR, HTTP.INTERNAL_SERVER_ERROR);
}

module.exports = errorMiddleware;
