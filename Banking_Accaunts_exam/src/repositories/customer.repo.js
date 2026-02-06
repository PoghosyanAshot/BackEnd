"use strict";

const pool = require("../db/pool");

const createCustomer = async ({ fullName, email, phone }) => {
    const { rows } = await pool.query(
        `
        INSERT INTO customers(full_name, email, phone)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [fullName, email, phone || null]
    );

    return rows[0];
};

const getCustomerById = async (id) => {
    const { rows } = await pool.query(`SELECT * FROM customers WHERE id = $1`, [id]);

    return rows[0] || null;
};

const getAllCustomers = async () => {
    const { rows } = await pool.query(`SELECT * FROM customers ORDER BY id DESC`);

    return rows;
};

module.exports = {
    createCustomer,
    getCustomerById,
    getAllCustomers,
};
