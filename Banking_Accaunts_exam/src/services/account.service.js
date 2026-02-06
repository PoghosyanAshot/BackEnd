"use strict";

const repo = require("../repositories/account.repo");
const customersRepo = require("../repositories/customer.repo");

const NotFoundError = require("../errors/NotFoundError");
const BusinessError = require("../errors/BusinessError");

const createAccount = async (data) => {
    const customer = await customersRepo.getCustomerById(data.customerId);

    if (!customer) {
        throw new NotFoundError("Customer not found");
    }

    return repo.createAccount(data);
};

const getAccountById = async (id) => {
    const account = await repo.getAccountById(id);

    if (!account) {
        throw new NotFoundError("Account not found");
    }

    return account;
};

const getCustomerAccounts = async (customerId) => {
    return repo.getAccountsByCustomerId(customerId);
};

const updateAccountStatus = async (id, status) => {
    const account = await repo.getAccountById(id);

    if (!account) {
        throw new NotFoundError("Account not found");
    }

    if (account.status === "closed") {
        throw new BusinessError("Closed account cannot be modified");
    }

    return repo.updateStatus(id, status);
};

module.exports = {
    createAccount,
    getAccountById,
    getCustomerAccounts,
    updateAccountStatus,
};
