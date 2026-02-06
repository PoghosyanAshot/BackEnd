"use strict";

const HTTP = require("../constants/httpStatus.constants");

const success = (res, data = null, message = "Success", status = HTTP.OK) => {
    return res.status(status).json({
        success: true,
        message,
        data,
    });
};

const created = (res, data = null, message = "Created") => {
    return res.status(HTTP.CREATED).json({
        success: true,
        message,
        data,
    });
};

const noContent = (res) => {
    return res.status(HTTP.NO_CONTENT).send();
};

const error = (
    res,
    message = "Internal Server Error",
    status = HTTP.INTERNAL_SERVER_ERROR,
    errors = null
) => {
    return res.status(status).json({
        success: false,
        message,
        errors,
    });
};

module.exports = {
    success,
    created,
    noContent,
    error,
};
