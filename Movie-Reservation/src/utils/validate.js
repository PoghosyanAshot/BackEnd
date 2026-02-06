"use strict";

const MSG = require("../constants/responseMessages");
const REGEX_PATTERNS = require("../constants/patterns");
const { ValidationError } = require("../errors");

const id = (id) => {
    if (!REGEX_PATTERNS.ID.test(id)) {
        throw new ValidationError(MSG.INVALID_ID);
    }
};

const fullName = (fullName) => {
    if (!REGEX_PATTERNS.FULL_NAME.test(fullName)) {
        throw new ValidationError(MSG.INVALID_FULL_NAME);
    }
};

const email = (email) => {
    if (!REGEX_PATTERNS.EMAIL.test(email)) {
        throw new ValidationError(MSG.INVALID_EMAIL);
    }
};

const password = (password) => {
    if (!REGEX_PATTERNS.PASSWORD.test(password)) {
        throw new ValidationError(MSG.INVALID_PASSWORD);
    }
};

const hallName = (hallName) => {
    if (!REGEX_PATTERNS.HALL_NAME.test(hallName)) {
        throw new ValidationError(MSG.INVALID_HALL_NAME);
    }
};

const seatNumber = (seatNumber) => {
    if (!REGEX_PATTERNS.SEAT_NUMBER.test(seatNumber)) {
        throw new ValidationError(MSG.INVALID_SEAT_NUMBER);
    }
};

const movieTitle = (movieTitle) => {
    if (!REGEX_PATTERNS.MOVIE_TITLE.test(movieTitle)) {
        throw new ValidationError(MSG.INVALID_MOVIE_TITLE);
    }
};

const price = (price) => {
    if (!REGEX_PATTERNS.PRICE.test(price)) {
        throw new ValidationError(MSG.INVALID_PRICE);
    }
};

const positiveInt = (positiveInt) => {
    if (!REGEX_PATTERNS.POSITIVE_INT.test(positiveInt)) {
        throw new ValidationError(MSG.INVALID_POSITIVE_INT);
    }
};

const date = (date) => {
    if (!REGEX_PATTERNS.ISO_DATE) {
        throw new ValidationError(MSG.INVALID_DATE);
    }
};

const dateTime = (dateTime) => {
    if (!REGEX_PATTERNS.ISO_DATETIME.test(dateTime)) {
        throw new ValidationError(MSG.INVALID_DATETIME);
    }
};

const token = (token) => {
    if (!REGEX_PATTERNS.JWT.test(token)) {
        throw new ValidationError(MSG.INVALID_TOKEN);
    }
};

module.exports = {
    id,
    fullName,
    email,
    password,
    hallName,
    seatNumber,
    movieTitle,
    price,
    positiveInt,
    date,
    dateTime,
    token,
};