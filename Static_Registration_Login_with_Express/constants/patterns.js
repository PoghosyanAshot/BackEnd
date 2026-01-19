"use strict";

const PATTERNS = Object.freeze({
    // Simple email pattern (not RFC-perfect, but fine for validation)
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    // Phone: allows digits, spaces, dashes, parentheses, and leading +
    PHONE: /^\+?[0-9\s\-()]{7,20}$/,

    // Password: simple check password
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/,

    // URL: simple check (http/https required)
    URL: /^https?:\/\/[^\s/$.?#].[^\s]*$/i,

    // GitHub profile link (optional stricter validation)
    GITHUB_URL: /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9-]{1,39}\/?$/i,
});

module.exports = PATTERNS;
