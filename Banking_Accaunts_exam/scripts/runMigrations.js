"use strict";

const fs = require("fs");
const path = require("path");
const pool = require("../src/db/pool");

const runMigrations = async () => {
    const migrationsDir = path.join(__dirname, "../sql/migrations");

    const files = fs
        .readdirSync(migrationsDir)
        .filter((f) => f.endsWith(".sql"))
        .sort();

    for (const file of files) {
        console.log("Running migration:", file);

        const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");

        await pool.query(sql);
    }

    console.log("Migrations done");
};

module.exports = runMigrations;
