"use strict";

const MSG = Object.freeze({
    // general
    SERVER_ERROR: "Internal Server Error",
    NOT_FOUND: "Resource not found",
    FORBIDDEN: "Access denied",
    UNAUTHORIZED: "Authentication required",
    BAD_REQUEST: "Invalid request data",

    // required fields
    NAME_REQUIRED: "Name is required",
    EMAIL_REQUIRED: "Email is required",
    PASSWORD_REQUIRED: "Password is required",
    TITLE_REQUIRED: "Book title is required",
    AUTHOR_REQUIRED: "Author is required",
    YEAR_REQUIRED: "Year is required",

    // format / validation
    INVALID_NAME: "Name format is invalid",
    INVALID_EMAIL: "Email format is invalid",
    INVALID_PASSWORD: "Password must be at least 6 characters and contain a number",
    INVALID_TITLE: "Book title format is invalid",
    INVALID_AUTHOR: "Author format is invalid",
    INVALID_YEAR: "Year must be a valid number (e.g. 2020)",

    // authentication
    LOGIN_SUCCESS: "Login successful",
    LOGIN_FAILED: "Invalid email or password",
    LOGOUT_SUCCESS: "Logged out successfully",
    LOGOUT_FAILED: "Logout falid",
    REGISTER_SUCCESS: "Account created successfully",
    EMAIL_ALREADY_EXISTS: "Email already exists",
    INVALID_CREDENTIALS: "Wrong credentials",

    // users
    USER_NOT_FOUND: "User not found",
    USER_CREATED: "User created",
    USER_ROLE_UPDATED: "User role updated",

    // books
    BOOK_CREATED: "Book created successfully",
    BOOK_UPDATED: "Book updated successfully",
    BOOK_DELETED: "Book deleted successfully",
    BOOK_NOT_FOUND: "Book not found",
    BOOK_NOT_AVAILABLE: "Book is not available",

    // loans
    BOOK_BORROWED: "Book borrowed successfully",
    BOOK_RETURNED: "Book returned successfully",
    LOAN_NOT_FOUND: "Loan not found",
    NOT_YOUR_LOAN: "You cannot return a book you did not borrow",
    BOOK_ALREADY_BORROWED: "This book is already borrowed",
});

module.exports = MSG;
