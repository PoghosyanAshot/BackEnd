"use strict";

const fs = require("fs");
const path = require("path");
const pool = require("../src/db/pool");

const runSeed = async () => {
    const seedFile = path.join(__dirname, "../sql/seed.sql");

    if (!fs.existsSync(seedFile)) {
        console.log("No seed file found");
        return;
    }

    const sql = fs.readFileSync(seedFile, "utf8");

    await pool.query(sql);

    console.log("Seed completed");
}

module.exports = runSeed;