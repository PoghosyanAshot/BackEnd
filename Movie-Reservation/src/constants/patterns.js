"use strict";

const REGEX_PATTERNS = Object.freeze({
    // IDs (PostgreSQL serial / uuid like)
    ID: /^[0-9]+$/,

    // User
    FULL_NAME: /^[A-Za-zԱ-Ֆա-ֆ\s]{2,50}$/,
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,

    // Movie
    MOVIE_TITLE: /^.{1,100}$/,
    HALL_NAME: /^[A-Z][0-9]?$/, // A, B, A1, B2
    SEAT_NUMBER: /^[A-Z][0-9]{1,2}$/, // A1, B12

    // Date & time
    ISO_DATE: /^\d{4}-\d{2}-\d{2}$/,
    ISO_DATETIME: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/,

    // Numbers
    PRICE: /^[0-9]+(\.[0-9]{1,2})?$/,
    POSITIVE_INT: /^[1-9][0-9]*$/,

    // Tokens / misc
    JWT: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/,
});

module.exports = REGEX_PATTERNS;
