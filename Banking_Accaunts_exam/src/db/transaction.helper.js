"use strict";

const pool = require("./pool");
const logger = require("../utils/logger");

const withTransaction = async (cb) => {

    const client = await pool.connect();

    try {

        await client.query("BEGIN");

        const result = await cb(client);

        await client.query("COMMIT");

        return result;

    } catch (err) {

        try {
            await client.query("ROLLBACK");
        } catch (rollbackError) {
            logger.error("Rollback failed", rollbackError);
        }

        throw err;

    } finally {

        client.release();

    }
}

module.exports = withTransaction;