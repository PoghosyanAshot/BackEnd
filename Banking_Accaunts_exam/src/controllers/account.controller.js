"use strict";

const service = require("../services/account.service");
const response = require("../utils/responseFormatter");
const asyncHandler = require("../utils/asyncHandler");

const createAccount = asyncHandler(async (req, res) => {
    const account = await service.createAccount(req.body);

    return response.created(res, account);
});

const getAccountById = asyncHandler(async (req, res) => {
    const account = await service.getAccountById(Number(req.params.id));

    return response.success(res, account);
});

const getCustomerAccounts = asyncHandler(async (req, res) => {
    const accounts = await service.getCustomerAccounts(Number(req.params.id));

    return response.success(res, accounts);
});

const updateAccountStatus = asyncHandler(async (req, res) => {
    const updated = await service.updateAccountStatus(Number(req.params.id), req.body.status);

    return response.success(res, updated);
});

module.exports = {
    createAccount,
    getAccountById,
    getCustomerAccounts,
    updateAccountStatus,
};
