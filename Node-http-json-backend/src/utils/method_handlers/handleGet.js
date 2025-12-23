const { constants } = require("node:http2");
const sendResponse = require("../sendResponse");
const isValidId = require('./helpers_for_handlers/isValidId');

const handleGet = (res, id, data) => {
    if (id !== undefined) {
        if (isValidId(id, data)) {
            return sendResponse(res, constants.HTTP_STATUS_OK, data[id]);
        }

        return sendResponse(res, constants.HTTP_STATUS_NOT_FOUND, {message: "Oops, resource not found"});
    }

    return sendResponse(res, constants.HTTP_STATUS_OK, data);
};

module.exports = handleGet;
