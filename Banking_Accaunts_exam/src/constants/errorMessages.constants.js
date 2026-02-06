"use strict";

const ERRORS = Object.freeze({
    INTERNAL_ERROR: "Internal server error",

    CUSTOMER_NOT_FOUND: "Customer not found",

    ACCOUNT_NOT_FOUND: "Account not found",
    ACCOUNT_NOT_ACTIVE: "Account is not active",
    ACCOUNT_FROZEN: "Account is frozen",
    ACCOUNT_CLOSED: "Account is closed",

    INSUFFICIENT_FUNDS: "Insufficient balance",

    INVALID_AMOUNT: "Amount must be greater than zero",

    SAME_ACCOUNT_TRANSFER: "Cannot transfer to the same account",

    DUPLICATE_REFERENCE: "Transaction with this reference already exists",
});

module.exports = ERRORS;
