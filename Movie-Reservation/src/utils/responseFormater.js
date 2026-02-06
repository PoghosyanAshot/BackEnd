"use strict";

const HTTP = require("../constants/httpStatus");
const MSG = require("../constants/responseMessages");

const success = (res, data, statusCode = HTTP.OK, message = MSG.SUCCESS) => {
    return res.status(statusCode).json({
        status: "success",
        message,
        data,
    });
};

const error = (res, statusCode = HTTP.INTERNAL_ERROR, message = MSG.INTERNAL_ERROR) => {
    return res.status(statusCode).json({
        status: "error",
        message,
    });
};

module.exports = { success, error };
