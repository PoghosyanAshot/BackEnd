"use strict";

const AppError = require("../utils/AppError");
const HTTP = require("../../constants/httpStatus");
const MSG = require("../../constants/respnoseMessages");
const { validateEmail, validatePassword } = require("../../constants/patterns");

const valideLoginForm = (req, res, next) => {
    const email = (req.body.email || "").trim();
    const password = (req.body.password || "").trim();

    // check email
    if (!email) {
        return next(
            new AppError({
                statusCode: HTTP.BAD_REQUEST,
                message: MSG.EMAIL_REQUIRED,
            })
        );
    }

    if (!validateEmail(email)) {
        return next(
            new AppError({
                statusCode: HTTP.BAD_REQUEST,
                message: MSG.INVALID_EMAIL,
            })
        );
    }

    // check password
    if (!password) {
        return next(
            new AppError({
                statusCode: HTTP.BAD_REQUEST,
                message: MSG.PASSWORD_REQUIRED,
            })
        );
    }

    if (!validatePassword(password)) {
        return next(
            new AppError({
                statusCode: HTTP.BAD_REQUEST,
                message: MSG.INVALID_PASSWORD,
            })
        );
    }

    req.validData = { email, password };
    next();
};

module.exports = valideLoginForm;
