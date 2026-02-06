"use strict";

const validators = require("../utils/validators");

const SCHEMA = Object.freeze({
    reference: validators.isValidReference,
});

module.exports = SCHEMA;
