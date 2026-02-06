"use strict";

const { Pool } = require("pg");
const configs = require("../configs/env.config");

const pool = new Pool({
    host: configs.DB.HOST,
    port: configs.DB.PORT,
    database: configs.DB.NAME,
    user: configs.DB.USER,
    password: configs.DB.PASSWORD,
    max: 10,                 // max connections
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

pool.on("connect", () => {
    console.log("PostgreSQL connected");
});

pool.on("error", (err) => {
    console.error("Unexpected PG error", err);
    process.exit(1);
});

module.exports = pool;