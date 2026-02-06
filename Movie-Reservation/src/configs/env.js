"use strict";

require("dotenv").config({ quiet: true });

const configs = Object.freeze({
    // server configs
    NODE_ENV: process.env.NODE_ENV,
    PORT: Number(process.env.PORT || 3001),
    HOST: process.env.HOST,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,

    // database configs
    DB: {
        HOST: process.env.DB_HOST,
        PORT: Number(process.env.DB_PORT || 5432),
        NAME: process.env.DB_NAME,
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD,
    },
});

module.exports = configs;
