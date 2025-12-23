const { constants } = require("node:http2");
const PRODUCTS = require("../../constants/products");
const dataUpdates = require("../method_handlers/update-&-create_data/dataUpdates");
const sendResponse = require("../sendResponse");
const bodyParser = require("../bodyParser");
const writeFile = require('../writeFile');
const isValidId = require("./helpers_for_handlers/isValidId");

const handlePatch = async (req, res, id, data, path, hint) => {
    if (id === undefined || !isValidId(id, data)) {
        return sendResponse(res, constants.HTTP_STATUS_BAD_REQUEST, {
            message: "The given ID was invalid",
        });
    }

    let body = null;

    try {
        body = await bodyParser(req);
    } catch (err) {
        return sendResponse(res, constants.HTTP_STATUS_BAD_REQUEST, {
            message: "The given data was invalid",
        });
    }

    try {
        switch (hint) {
            case PRODUCTS.USERS:
                dataUpdates.updateUserData(body, data, id);
                break;
            case PRODUCTS.ORDERS:
                dataUpdates.updateOrderData(body, data, id);
                break;
            case PRODUCTS.PRODUCTS:
                dataUpdates.updateProductData(body, data, id);
                break;
        }

        writeFile(path, JSON.stringify(data));
        sendResponse(res, constants.HTTP_STATUS_OK, body);
    } catch (err) {
        return sendResponse(res, constants.HTTP_STATUS_BAD_REQUEST, {
            message: err,
        });
    }
};

module.exports = handlePatch;
