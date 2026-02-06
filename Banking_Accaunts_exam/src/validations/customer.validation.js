"use strict";

const validators = require("../utils/validators");

const SCHEMA = Object.freeze({
    fullName: validators.isValidName,
    email: validators.isValidEmail,
    phone: validators.isValidPhone,
});

module.exports = SCHEMA;
