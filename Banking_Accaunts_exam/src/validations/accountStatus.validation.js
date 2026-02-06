"use strict";

const validators = require("../utils/validators");

const SCHEMA = Object.freeze({
    status: validators.isValidStatus,
});

module.exports = SCHEMA;
