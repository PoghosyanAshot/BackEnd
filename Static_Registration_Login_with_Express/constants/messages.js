"use strcit";

const MSG = Object.freeze({
    // Generic
    ROUTE_NOT_FOUND: "Route not found", 
    VALIDATION_FAILED: "Validation failed",
    INTERNAL_ERROR: "Internal server error",

    // Auth - Register
    REGISTER_SUCCESS: "Registered successfully",
    DUPLICATE_EMAIL: "Email already exists",

    FULLNAME_REQUIRED: "Full name is required",
    FULLNAME_MIN_3: "Full name must be at least 3 characters",

    EMAIL_REQUIRED: "Email is required",
    EMAIL_INVALID: "Email is invalid",

    PASSWORD_REQUIRED: "Password is required",
    PASSWORD_MIN_6: "Password must be at least 6 chars",
    PASSWORD_INVALID: "Password invalid",

    PHONE_INVALID: "Phone is invalid",
    AGE_INVALID: "Age is invalid",
    GITHUB_INVALID: "GitHub link is invalid",

    IMAGE_INVALID_TYPE: "Image must be jpeg, png, or webp",
    IMAGE_TOO_LARGE: "Image must be <= 2MB",

    // Auth - Login
    LOGIN_SUCCESS: "Login successful",
    INVALID_CREDENTIALS: "Invalid email or password",

    // Storage
    JSON_STORE_ERROR: "Failed to save data",
    JSON_READ_ERROR: "Failed to read data",

    // Users (optional)
    USERS_LIST_SUCCESS: "Users fetched successfully",
});

module.exports = MSG;
