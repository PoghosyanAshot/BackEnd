const { constants } = require("node:http2");

const sendResponse = (res, statusCode, data) => {
    res.writeHead(statusCode, { "Content-Type": "application/json" });

    if (statusCode === constants.HTTP_STATUS_NO_CONTENT) {
        res.end();
        return true;
    }

    res.end(JSON.stringify(data));
    return true;
};

module.exports = sendResponse;
