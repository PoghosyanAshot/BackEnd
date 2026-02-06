"use strict";

const withTransaction = require("../db/transaction.helper");

const accountsRepo = require("../repositories/account.repo");
const transactionsRepo = require("../repositories/transaction.repo");
const auditRepo = require("../repositories/audit.repo");

const NotFoundError = require("../errors/NotFoundError");
const BusinessError = require("../errors/BusinessError");

const transfer = async (data) => {
    return withTransaction(async (client) => {
        const from = await accountsRepo.getAccountForUpdate(data.fromAccountId, client);

        const to = await accountsRepo.getAccountForUpdate(data.toAccountId, client);

        if (!from) throw new NotFoundError("From account not found");
        if (!to) throw new NotFoundError("To account not found");

        if (from.status !== "active") throw new BusinessError("From account not active");

        if (to.status !== "active") throw new BusinessError("To account not active");

        if (from.balance < data.amount) throw new BusinessError("Insufficient balance");

        const updatedFrom = await accountsRepo.updateBalance(
            from.id,
            from.balance - data.amount,
            client
        );

        const updatedTo = await accountsRepo.updateBalance(to.id, to.balance + data.amount, client);

        const tx = await transactionsRepo.createTransaction(
            {
                type: "transfer",
                ...data,
            },
            client
        );

        await auditRepo.createAuditLog(
            {
                action: "TRANSFER_COMPLETED",
                meta: {
                    fromAccountId: from.id,
                    toAccountId: to.id,
                    amount: data.amount,
                    reference: data.reference,
                },
            },
            client
        );

        return {
            transaction: tx,
            fromAccount: updatedFrom,
            toAccount: updatedTo,
        };
    });
};

module.exports = { transfer };
