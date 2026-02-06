"use strict";

const RE = Object.freeze({
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    PHONE: /^[0-9]{6,15}$/,

    REFERENCE: /^[a-zA-Z0-9-_]{3,50}$/,

    NAME: /^[a-zA-Z\s]{2,100}$/,

    CURRENCY: /^(AMD|USD|EUR)$/,

    STATUS: /^(active|frozen|closed)$/,
});

module.exports = RE;
