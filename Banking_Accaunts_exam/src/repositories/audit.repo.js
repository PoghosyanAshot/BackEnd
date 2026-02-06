"use strict";

const pool = require("../db/pool");

const createAuditLog = async ({ action, meta }, client = null) => {
    const executor = client || pool;

    const { rows } = await executor.query(
        `
        INSERT INTO audit_logs(action, meta)
        VALUES ($1, $2)
        RETURNING *
        `,
        [action, meta]
    );

    return rows[0];
};

const getAuditLogs = async () => {
    const { rows } = await pool.query(
        `
        SELECT *
        FROM audit_logs
        ORDER BY id DESC
        LIMIT 100
        `
    );

    return rows;
};

module.exports = {
    createAuditLog,
    getAuditLogs,
};
