"use strict";

const RESOURCES = require("./resources");

const MSG = Object.freeze({
    // Generic
    SUCCESS: "Success",
    CREATED: "Successfully created",
    UPDATED: "Successfully updated",
    DELETED: "Successfully deleted",

    // Generic Validation
    VALIDATION_ERROR: "Validation error",
    MISSING_FIELDS: "Required fields are missing",

    // Field-level Validation
    INVALID_ID: "Invalid ID format",
    INVALID_FULL_NAME: "Full name must contain only letters and be 2–50 characters",
    INVALID_EMAIL: "Invalid email format",
    INVALID_PASSWORD: "Password must be at least 8 characters and contain letters and numbers",
    INVALID_HALL_NAME: "Invalid hall name (example: A, B, A1)",
    INVALID_SEAT_NUMBER: "Invalid seat number (example: A1, B12)",
    INVALID_MOVIE_TITLE: "Invalid movie title",
    INVALID_PRICE: "Invalid price format",
    INVALID_POSITIVE_INT: "Value must be a positive integer",
    INVALID_DATE: "Invalid date format (YYYY-MM-DD)",
    INVALID_DATETIME: "Invalid datetime format",
    INVALID_TOKEN: "Invalid token format",

    // Auth
    INVALID_CREDENTIALS: "Invalid credentials",
    UNAUTHORIZED: "Unauthorized",
    FORBIDDEN: "Forbidden access",

    // Not Found
    USER_NOT_FOUND: `${RESOURCES.USER} not found`,
    MOVIE_NOT_FOUND: `${RESOURCES.MOVIE} not found`,
    SCREENING_NOT_FOUND: `${RESOURCES.SCREENING} not found`,
    SEAT_NOT_FOUND: `${RESOURCES.SEAT} not found`,
    RESERVATION_NOT_FOUND: `${RESOURCES.RESERVATION} not found`,
    PAYMENT_NOT_FOUND: `${RESOURCES.PAYMENT} not found`,
    HALL_NOT_FOUND: `${RESOURCES.HALL} not found`,

    // Business Logic
    MIN_SEATS_REQUIRED: "At least 2 seats required",
    SEAT_ALREADY_RESERVED: "One or more seats already reserved",
    PAYMENT_ALREADY_EXISTS: "Payment already exists for this reservation",
    RESERVATION_ALREADY_PAID: "Reservation already paid",
    SCREENING_ALREADY_STARTED: "Screening already started",

    // Conflict
    USER_ALREADY_EXISTS: `${RESOURCES.USER} already exists`,
    MOVIE_ALREADY_EXISTS: `${RESOURCES.MOVIE} already exists`,
    SEAT_ALREADY_EXISTS: `${RESOURCES.SEAT} already exists`,

    // Server
    INTERNAL_ERROR: "Internal Server Error",
    SERVICE_UNAVAILABLE: "Service temporarily unavailable",
});

module.exports = MSG;
