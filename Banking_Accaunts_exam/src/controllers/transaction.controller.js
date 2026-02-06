"use strict";

const service = require("../services/transaction.service");
const response = require("../utils/responseFormatter");
const asyncHandler = require("../utils/asyncHandler");

const getAccountTransactions = asyncHandler(async (req, res) => {
    const result = await service.getAccountTransactions(Number(req.params.id));

    return response.success(res, result);
});

const getTransactionByReference = asyncHandler(async (req, res) => {
    const result = await service.getTransactionByReference(req.params.reference);

    return response.success(res, result);
});

module.exports = {
    getAccountTransactions,
    getTransactionByReference,
};
