"use strict";

const AppError = require("../utils/AppError");
const HTTP = require("../../constants/httpStatus");
const MSG = require("../../constants/respnoseMessages");
const { validateBookTitle, validateAuthor, validateYear } = require("../../constants/patterns");

const validateBookForm = (req, res, next) => {
    const title = (req.body.title || "").trim();
    const author = (req.body.author || "").trim();
    const year = Number((req.body.year || "").trim());

    // check title
    if (!title) {
        return next(
            new AppError({
                statusCode: HTTP.BAD_REQUEST,
                message: MSG.TITLE_REQUIRED,
            })
        );
    }

    if (!validateBookTitle(title)) {
        return next(
            new AppError({
                statusCode: HTTP.BAD_REQUEST,
                message: MSG.INVALID_TITLE,
            })
        );
    }

    // check author
    if (!author) {
        return next(
            new AppError({
                statusCode: HTTP.BAD_REQUEST,
                message: MSG.AUTHOR_REQUIRED,
            })
        );
    }

    if (!validateAuthor(author)) {
        return next(
            new AppError({
                statusCode: HTTP.BAD_REQUEST,
                message: MSG.INVALID_AUTHOR,
            })
        );
    }

    // check year

    if (!year) {
        return next(
            new AppError({
                statusCode: HTTP.BAD_REQUEST,
                message: MSG.YEAR_REQUIRED,
            })
        );
    }

    if (!validateYear(year)) {
        return next(
            new AppError({
                statusCode: HTTP.BAD_REQUEST,
                message: MSG.INVALID_YEAR,
            })
        );
    }

    req.validData = { title, author, year };
    next();
};

module.exports = validateBookForm;
