"use strict";

const repo = require("../repositories/transaction.repo");
const NotFoundError = require("../errors/NotFoundError");

const getAccountTransactions = async (accountId) => {
    return repo.getAccountTransactions(accountId);
};

const getTransactionByReference = async (reference) => {
    const tx = await repo.getTransactionByReference(reference);

    if (!tx) throw new NotFoundError("Transaction not found");

    return tx;
};

module.exports = {
    getAccountTransactions,
    getTransactionByReference,
};
