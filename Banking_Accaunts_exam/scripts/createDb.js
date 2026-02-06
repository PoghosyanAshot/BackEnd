"use strict";

const { Client } = require("pg");
const configs = require("../src/configs/env.config");

const createDatabaseIfNotExists = async () => {
    const client = new Client({
        host: configs.DB.HOST,
        port: configs.DB.PORT,
        user: configs.DB.USER,
        password: configs.DB.PASSWORD,
        database: "postgres",
    });

    try {
        await client.connect();

        const dbName = configs.DB.NAME;

        const check = await client.query("SELECT 1 FROM pg_database WHERE datname = $1", [dbName]);

        if (check.rowCount === 0) {
            console.log(`Creating database ${dbName}...`);
            await client.query(`CREATE DATABASE ${dbName}`);
            console.log("Database created");
        } else {
            console.log("Database already exists");
        }
    } catch (err) {
        console.error("Create DB script failed:", err);
        throw err;
    } finally {
        await client.end();
    }
};

module.exports = createDatabaseIfNotExists;
