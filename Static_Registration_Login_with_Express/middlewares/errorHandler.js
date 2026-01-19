"use strict";

const multer = require("multer");
const { HTTP_STATUS, MSG } = require("../constants/constants");

const errorHandler = (err, req, res, next) => {
    // multer built-in errors
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                ok: false,
                errors: [MSG.IMAGE_TOO_LARGE],
            });
        }

        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            ok: false,
            errors: [err.message],
        });
    }

    // is custom Server Error
    const isServerError = err && err.name === "ServerError";
    const statusCode = isServerError ? err.statusCode : HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const errors =
        Array.isArray(err.errors) && err.errors.length
            ? err.errors
            : [isServerError ? err.message : MSG.INTERNAL_ERROR];

    const payload = {
        ok: false,
        errors,
    };

    if (statusCode >= HTTP_STATUS.INTERNAL_SERVER_ERROR) {
        console.error("[ERROR]", {
            method: req.method,
            path: req.originalUrl,
            message: err.message,
            stack: err.stack,
        });
    }

    if (err.cause) {
        console.error("[CAUSER]", {
            message: err.cause.message,
            stack: err.cause.stack,
        });
    }

    return res.status(statusCode).json(payload);
};

module.exports = errorHandler;
