const { Pool } = require("pg");
const { DB } = require("../configs/env");

let pool = null;

const connectDB = async () => {
    pool = new Pool({
        host: DB.HOST,
        port: DB.PORT,
        database: DB.NAME,
        user: DB.USER,
        password: DB.PASSWORD,
    });

    await pool.query("SELECT 1");
    console.log("PostgreSQL connected");
    return pool;
};

const getDB = () => {
    if (!pool) {
        throw new Error("DB not connected yet");
    }

    return pool;
};

module.exports = { connectDB, getDB };
