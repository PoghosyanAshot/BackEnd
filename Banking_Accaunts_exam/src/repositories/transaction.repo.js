"use strict";

const pool = require("../db/pool");

const createTransaction = async (data, client) => {
    const executor = client || pool;

    const { rows } = await executor.query(
        `
        INSERT INTO transactions(
            type,
            from_account_id,
            to_account_id,
            amount,
            reference,
            note
        )
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING *
        `,
        [
            data.type,
            data.fromAccountId,
            data.toAccountId,
            data.amount,
            data.reference,
            data.note || null,
        ]
    );

    return rows[0];
};

const getAccountTransactions = async (accountId) => {
    const { rows } = await pool.query(
        `
        SELECT *
        FROM transactions
        WHERE from_account_id = $1
           OR to_account_id = $1
        ORDER BY id DESC
        LIMIT 100
        `,
        [accountId]
    );

    return rows;
};

const getTransactionByReference = async (reference) => {
    const { rows } = await pool.query(
        `
        SELECT *
        FROM transactions
        WHERE reference = $1
        `,
        [reference]
    );

    return rows[0] || null;
};

module.exports = {
    createTransaction,
    getAccountTransactions,
    getTransactionByReference,
};
