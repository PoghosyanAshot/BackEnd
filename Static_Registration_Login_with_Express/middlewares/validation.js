"use strict";

const { MSG, LIMITS, PATTERNS, HTTP_STATUS } = require("../constants/constants");
const { BAD_REQUEST } = require("../constants/httpStatus");
const ServerError = require("../utils/serverError");

const validateUserData = (req, res, next) => {
    const errors = [];
    const data = req.body;

    const fullName = (data.fullName || "").trim();
    const email = (data.email || "").trim();
    const password = (data.password || "").trim();

    // validate fullName
    if (!fullName) {
        errors.push(MSG.FULLNAME_REQUIRED);
    } else if (fullName.length < LIMITS.FULLNAME_MIN_LEN) {
        errors.push(MSG.FULLNAME_MIN_3);
    }

    // validate email
    if (!email) {
        errors.push(MSG.EMAIL_REQUIRED);
    } else if (!PATTERNS.EMAIL.test(email)) {
        errors.push(MSG.EMAIL_INVALID);
    }

    // validate password
    if (!password) {
        errors.push(MSG.PASSWORD_REQUIRED);
    } else if (!PATTERNS.PASSWORD.test(password)) {
        errors.push(MSG.PASSWORD_INVALID);
    }

    const phone = (data.phone || "").trim();

    // validate phone
    if (phone && !PATTERNS.PHONE.test(phone)) {
        errors.push(MSG.PHONE_INVALID);
    }

    const ageRaw = (data.age || "").trim();

    // valdate age
    if (ageRaw) {
        const age = Number(ageRaw);
        const ok = Number.isInteger(age) && age >= LIMITS.AGE_MIN && age <= LIMITS.AGE_MAX;

        if (!ok) {
            errors.push(MSG.AGE_INVALID);
        }
    }

    const github = (data.github || "").trim();

    // validate github link
    if (github && !PATTERNS.GITHUB_URL.test(github)) {
        errors.push(MSG.GITHUB_INVALID);
    }

    if (errors.length) {
        return next(
            new ServerError({
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: MSG.VALIDATION_FAILED,
                errors,
            })
        );
    }

    next();
};

const validateLoginData = (req, res, next) => {
    const errors = [];
    const data = req.body;
    const email = (data.email || "").trim();
    const password = (data.password || "").trim();

    if (!email) {
        errors.push(MSG.EMAIL_REQUIRED);
    } else if (!PATTERNS.EMAIL.test(email)) {
        errors.push(MSG.EMAIL_INVALID);
    }

    if (!password) {
        errors.push(MSG.PASSWORD_REQUIRED);
    } else if (!PATTERNS.PASSWORD.test(password)) {
        errors.push(MSG.PASSWORD_INVALID);
    }

    if (errors.length) {
        return next(
            new ServerError({
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: MSG.VALIDATION_FAILED,
                errors,
            })
        );
    }

    next();
};

module.exports = { validateUserData, validateLoginData };
