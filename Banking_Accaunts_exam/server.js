"use strict";

const app = require("./src/app");
const pool = require("./src/db/pool");
const configs = require("./src/configs/env.config");

const PORT = configs.PORT;
const HOST = configs.HOST;

const main = async () => {
    try {
        await pool.query("SELECT 1");

        app.listen(PORT, HOST, () => {
            console.log(`Server run on ${HOST}:${PORT}`);
        });
    } catch (e) {
        console.error("Failed to start server", e);
        process.exit(1);
    }
};

main();
