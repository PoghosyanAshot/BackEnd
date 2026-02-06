"use strict";

const validators = require("../utils/validators");

const SCHEMA = Object.freeze({
    fromAccountId: (v) => Number.isInteger(v) && v > 0,
    toAccountId: (v) => Number.isInteger(v) && v > 0,
    amount: validators.isValidAmount,
    reference: validators.isValidReference,
    note: () => true,
    _accountsDifferent: (_, body) => {
        return body.fromAccountId !== body.toAccountId;
    },
});

module.exports = SCHEMA;
