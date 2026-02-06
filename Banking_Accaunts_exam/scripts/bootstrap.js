"use strict";

const createDb = require("./createDb");
const runMigrations = require("./runMigrations");
const runSeed = require("./seed");

const bootstrap = async () => {
    try {
        console.log("Bootstrapping project...");

        await createDb();

        await runMigrations();

        await runSeed();

        console.log("Bootstrap completed");

        process.exit(0);
    } catch (e) {
        console.error("Bootstrap failed", e);
        process.exit(1);
    }
};

bootstrap();
