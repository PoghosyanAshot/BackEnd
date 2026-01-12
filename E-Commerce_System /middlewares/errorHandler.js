const HTTP_STATUS = require("../constants/httpStatus");
const MSG = require("../constants/responseMessages");

const errorHandler = (err, req, res, next) => {
    const isAppError = err && err.name === "AppError";
    const statusCode = isAppError ? err.statusCode : HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const payload = {
        success: false,
        message: isAppError ? err.message : MSG.INTERNAL_ERROR,
    };

    if (isAppError && err.details !== null) {
        payload.details = err.details;
    }

    if (statusCode >= HTTP_STATUS.INTERNAL_SERVER_ERROR) {
        console.error("[ERROR]", {
            method: req.method,
            path: req.originalUrl,
            message: err.message,
            stack: err.stack,
        });
    }

    return res.status(statusCode).json(payload);
};

module.exports = errorHandler;