"use strict";

const fs = require("node:fs/promises");
const path = require("node:path");
const AppError = require("../utils/AppError");
const HTTP = require("../../constants/httpStatus");
const MSG = require('../../constants/respnoseMessages');

const dataDir = path.join(__dirname, "..", "..", "data");

const filePath = (name) => path.join(dataDir, `${name}.json`);

const read = async (name) => {
    try {
        const data = await fs.readFile(filePath(name), "utf-8");
        return JSON.parse(data);
    } catch (err) {
        throw new AppError({
            statusCode: HTTP.INTERNAL_SERVER_ERROR,
            message: MSG.JSON_READ_ERROR,
            cause: err,
        });
    }
};

const write = async (name, data) => {
    const tmp = filePath(name + ".tmp");

    try {
        const json = JSON.stringify(data, null, 4);

        await fs.writeFile(tmp, json, "utf-8");
        await fs.rename(tmp, filePath(name));
    } catch (err) {
        throw new AppError({
            statusCode: HTTP.INTERNAL_SERVER_ERROR,
            message: MSG.JSON_STORE_ERROR,
            cause: err,
        });
    }
};

module.exports = { read, write };
