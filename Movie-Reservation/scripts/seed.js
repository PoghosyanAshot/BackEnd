"use strict";

const fs = require("node:fs");
const path = require("node:path");

const { connectDB, getDB } = require("../src/db");

async function seed() {
    try {
        await connectDB();

        const db = getDB();

        const seedSQL = fs.readFileSync(path.join(__dirname, "../sql/02_seed.sql"), "utf8");

        await db.query(seedSQL);

        console.log("Seed data inserted successfully");

        process.exit(0);
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
}

seed();
