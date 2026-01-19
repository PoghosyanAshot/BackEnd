"use strict";

const LIMITS = Object.freeze({
    FULLNAME_MIN_LEN: 3,
    PASSWORD_MIN_LEN: 6,

    // Upload
    MAX_IMAGE_BYTES: 2 * 1024 * 1024, // 2MB

    // Multer allowed mimetypes
    ALLOWED_IMAGE_MIMETYPES: Object.freeze(["image/jpeg", "image/png", "image/webp"]),

    // Optional reasonable ranges
    AGE_MIN: 1,
    AGE_MAX: 120,
});

module.exports = LIMITS;
