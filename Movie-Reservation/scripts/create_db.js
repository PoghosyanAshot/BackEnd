require("dotenv").config({ quiet: true });
const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: "postgres",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

const createDatebase = async () => {
    try {
        const dbName = process.env.DB_NAME;

        const res = await pool.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);

        if (res.rowCount > 0) {
            console.log(`Datebase "${dbName}" already exists`);
        } else {
            await pool.query(`CREATE DATABASE ${dbName}`);
            console.log(`Database "${dbName}" created successfully`);
        }
    } catch (err) {
        console.error("Failed to create database: ", err);
    } finally {
        await pool.end();
    }
};

createDatebase();