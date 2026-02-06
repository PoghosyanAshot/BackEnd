"use strict";

const REGEX = require("../constants/regex.constants");
const RULES = require("../constants/validationRules.constants");

const isValidString = (value) => {
    return typeof value === "string" && value.trim().length > 0;
};

const isValidEmail = (email) => {
    return REGEX.EMAIL.test(email);
};

const isValidPhone = (phone) => {
    if (!phone) return true;
    return REGEX.PHONE.test(phone);
};

const isValidName = (name) => {
    return (
        isValidString(name) &&
        REGEX.NAME.test(name) &&
        name.length >= RULES.NAME.MIN &&
        name.length <= RULES.NAME.MAX
    );
};

const isValidAmount = (amount) => {
    return Number.isInteger(amount) && amount >= RULES.AMOUNT.MIN && amount <= RULES.AMOUNT.MAX;
};

const isValidReference = (ref) => {
    return (
        REGEX.REFERENCE.test(ref) &&
        ref.length >= RULES.REFERENCE.MIN &&
        ref.length <= RULES.REFERENCE.MAX
    );
};

const isValidCurrency = (currency) => {
    return REGEX.CURRENCY.test(currency);
};

const isValidStatus = (status) => {
    return REGEX.STATUS.test(status);
};

module.exports = {
    isValidEmail,
    isValidPhone,
    isValidName,
    isValidAmount,
    isValidReference,
    isValidCurrency,
    isValidStatus,
};
