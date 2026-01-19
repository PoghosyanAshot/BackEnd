"use strict";

const fs = require("node:fs/promises");
const path = require("node:path");
const ServerError = require("./serverError");
const { HTTP_STATUS, MSG } = require("../constants/constants");

const dirPath = path.join(__dirname, "..", "data");

const readData = (fileName) => async () => {
    const filePath = path.join(dirPath, fileName);

    try {
        const data = await fs.readFile(filePath);
        return JSON.parse(data);
    } catch (err) {
        throw new ServerError({
            statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: MSG.JSON_READ_ERROR,
            errors: [MSG.JSON_READ_ERROR],
            cause: err,
        });
    }
};

const writeData = (fileName) => async (data) => {
    const filePath = path.join(dirPath, fileName);

    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 4));
    } catch (err) {
        throw new ServerError({
            statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: MSG.JSON_STORE_ERROR,
            errors: [MSG.JSON_STORE_ERROR],
            cause: err,
        });
    }
};

module.exports = { readData, writeData };
