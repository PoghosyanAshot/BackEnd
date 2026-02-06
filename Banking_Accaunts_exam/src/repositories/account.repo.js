"use strict";

const pool = require("../db/pool");

const getAccountForUpdate = async (id, client) => {
    const { rows } = await client.query(
        `
        SELECT *
        FROM accounts
        WHERE id = $1
        FOR UPDATE
        `,
        [id]
    );

    return rows[0] || null;
};

const updateBalance = async (id, balance, client) => {
    const { rows } = await client.query(
        `
        UPDATE accounts
        SET balance = $2
        WHERE id = $1
        RETURNING *
        `,
        [id, balance]
    );

    return rows[0];
};

const createAccount = async ({ customerId, currency }) => {
    const { rows } = await pool.query(
        `
        INSERT INTO accounts(customer_id, currency, balance, status)
        VALUES ($1, $2, 0, 'active')
        RETURNING *
        `,
        [customerId, currency]
    );

    return rows[0];
};

const getAccountById = async (id) => {
    const { rows } = await pool.query(`SELECT * FROM accounts WHERE id = $1`, [id]);

    return rows[0] || null;
};

const getAccountsByCustomerId = async (customerId) => {
    const { rows } = await pool.query(
        `SELECT * FROM accounts WHERE customer_id = $1 ORDER BY id DESC`,
        [customerId]
    );

    return rows;
};

const updateStatus = async (id, status) => {
    const { rows } = await pool.query(
        `
        UPDATE accounts
        SET status = $2
        WHERE id = $1
        RETURNING *
        `,
        [id, status]
    );

    return rows[0] || null;
};

module.exports = {
    createAccount,
    getAccountById,
    getAccountsByCustomerId,
    updateStatus,
    getAccountForUpdate,
    updateBalance,
};
