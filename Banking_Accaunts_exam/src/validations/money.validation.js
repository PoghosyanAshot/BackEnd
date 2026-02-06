"use strict";

const validators = require("../utils/validators");

const SCHEMA = Object.freeze({
    amount: validators.isValidAmount,
    reference: validators.isValidReference,
    note: () => true,
});

module.exports = SCHEMA;
