const path = require("node:path");
const fs = require("node:fs/promises");
const AppError = require("./appError");
const HTTP_STATUS = require("../constants/httpStatus");
const MSG = require("../constants/responseMessages");

const dirPath = path.join(__dirname, "..", "data");

const readData = (fileName) => async () => {
    const filePath = path.join(dirPath, fileName);

    try {
        const data = await fs.readFile(filePath);
        return JSON.parse(data);
    } catch {
        throw new AppError({
            statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: MSG.JSON_STORE_ERROR,
        });
    }
};

const writeData = (fileName) => async (data) => {
    const filePath = path.join(dirPath, fileName);

    try {
        await fs.writeFile(filePath, JSON.stringify(data));
    } catch {
        throw new AppError({
            statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: MSG.JSON_STORE_ERROR,
        });
    }
};

module.exports = { readData, writeData };
