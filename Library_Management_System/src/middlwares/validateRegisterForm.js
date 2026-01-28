"use strict";

const AppError = require("../utils/AppError");
const HTTP = require("../../constants/httpStatus");
const MSG = require("../../constants/respnoseMessages");
const validatePatterns = require("../../constants/patterns");

const validateRegisterForm = (req, res, next) => {
    const name = (req.body.name || "").trim();
    const email = (req.body.email || "").trim();
    const password = (req.body.password || "").trim();

    // check name
    if (!name) {
        return next(
            new AppError({
                statusCode: HTTP.BAD_REQUEST,
                message: MSG.NAME_REQUIRED,
            })
        );
    }

    if (!validatePatterns.validateName(name)) {
        return next(
            new AppError({
                statusCode: HTTP.BAD_REQUEST,
                message: MSG.INVALID_NAME,
            })
        );
    }

    // check email
    if (!email) {
        return next(
            new AppError({
                statusCode: HTTP.BAD_REQUEST,
                message: MSG.EMAIL_REQUIRED,
            })
        );
    }

    if (!validatePatterns.validateEmail(email)) {
        return next(
            new AppError({
                statusCode: HTTP.BAD_REQUEST,
                message: MSG.INVALID_EMAIL,
            })
        );
    }

    if (!password) {
        return next(
            new AppError({
                statusbar: HTTP.BAD_REQUEST,
                message: MSG.PASSWORD_REQUIRED,
            })
        );
    }

    if (!validatePatterns.validatePassword(password)) {
        return next(
            new AppError({
                statusCode: HTTP.BAD_REQUEST,
                message: MSG.INVALID_PASSWORD,
            })
        );
    }

    req.validData = { name, email, password };

    next();
};

module.exports = validateRegisterForm;
