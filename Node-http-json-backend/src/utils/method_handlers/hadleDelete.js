const { constants } = require("node:http2");
const sendResponse = require("../sendResponse");
const writeFile = require("../writeFile");
const isValidId = require("./helpers_for_handlers/isValidId");

const handleDelete = (res, id, data, path) => {
    if (id === undefined || !isValidId(id, data)) {
        return sendResponse(res, constants.HTTP_STATUS_BAD_REQUEST, {
            message: "The given ID was invalid",
        });
    }

    data[id].isDeleted = true;
    writeFile(path, JSON.stringify(data));
    sendResponse(res, constants.HTTP_STATUS_NO_CONTENT);
};

module.exports = handleDelete;
