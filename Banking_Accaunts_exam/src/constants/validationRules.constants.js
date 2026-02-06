"use strict";

const RULES = Object.freeze({
    AMOUNT: {
        MIN: 1,
        MAX: 1_000_000_000,
    },
    NAME: {
        MIN: 2,
        MAX: 100,
    },
    REFERENCE: {
        MIN: 3,
        MAX: 50,
    },
});

module.exports = RULES;