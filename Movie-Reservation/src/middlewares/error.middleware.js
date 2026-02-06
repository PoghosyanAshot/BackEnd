"use strict";

const HTTP = require("../constants/httpStatus");
const MSG = require("../constants/responseMessages");
const logger = require("../utils/logger");
const formatter = require("../utils/responseFormater");

const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || HTTP.INTERNAL_ERROR;

    // 4xx
    if (err.isOperational && statusCode < HTTP.INTERNAL_ERROR) {
        return formatter.error(res, statusCode, err.message);
    }

    // 5xx
    logger.logError(err, req);

    return formatter.error(res, HTTP.INTERNAL_ERROR, MSG.INTERNAL_ERROR);
};

module.exports = errorMiddleware;
