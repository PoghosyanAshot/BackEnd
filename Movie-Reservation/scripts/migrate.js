"use strict";

const fs = require("node:fs");
const path = require("node:path");

const { connectDB, getDB } = require("../src/db");

async function migrate() {
    try {
        await connectDB();

        const db = getDB();

        const schema = fs.readFileSync(path.join(__dirname, "../sql/01_schema.sql"), "utf8");

        await db.query(schema);

        console.log("Schema applied");
        process.exit(0);
    } catch (err) {
        console.error("Migration failed:", err);
        process.exit(1);
    }
}

migrate();
