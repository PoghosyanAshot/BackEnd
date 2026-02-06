const { getDB } = require("../db");

const findAll = async () => {
    const db = getDB();

    const { rows } = await db.query(`
        SELECT id, full_name, email, created_at
        FROM users
        ORDER by id
    `);

    return rows;
};

module.exports = { findAll };
