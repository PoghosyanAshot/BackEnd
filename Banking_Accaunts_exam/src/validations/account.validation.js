"use strict";

const validators = require("../utils/validators");

const SCHEMA = Object.freeze({
    customerId: (v) => Number.isInteger(v) && v > 0,
    currency: validators.isValidCurrency,
});

module.exports = SCHEMA;
