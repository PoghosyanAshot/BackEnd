const { constants } = require("node:http2");

const METHODS = require("../../constants/methods");
const PRODUCTS = require('../../constants/products');
const creators = require('./update-&-create_data/dataCreators');
const sendResponse = require("../sendResponse");
const bodyParser = require("../bodyParser");
const writeFile = require("../writeFile");
const isValidData = require("./helpers_for_handlers/isValidData");
const isValidId = require("./helpers_for_handlers/isValidId");


const hanldePut = async (req, res, id, data, path, hint) => {
    if (id === undefined || !isValidId(id, data)) {
        return sendResponse(res, constants.HTTP_STATUS_BAD_REQUEST, {
            message: "The given ID was invalid",
        });
    }

    let body = "";

    try {
        body = await bodyParser(req);
    } catch (err) {
        return sendResponse(res, constants.HTTP_STATUS_BAD_REQUEST, {
            message: "The given data was invalid",
        });
    }

    if (isValidData(body, data, hint, METHODS.PUT, id)) {
        try {
            const newData = {};

            switch (hint) {
                case PRODUCTS.USERS:
                    creators.createUserData(body, data, newData, METHODS.PUT, id);
                    break;
                case PRODUCTS.ORDERS:
                    creators.createOrderData(body, data, newData, METHODS.PUT, id);
                    break;
                case PRODUCTS.PRODUCTS:
                    creators.createProductData(body, data, newData, METHODS.PUT, id);
                    break;
            }

            data[id] = newData;
            writeFile(path, JSON.stringify(data));
            sendResponse(res, constants.HTTP_STATUS_CREATED, body);
        } catch (err) {
            console.log(err.message);
            sendResponse(res, constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, {
                message: "An unexpected error occurred. Please try again later.",
            });
        }
    } else {
        sendResponse(res, constants.HTTP_STATUS_BAD_REQUEST, {
            message: "The given data was invalid",
        });
    }
};

module.exports = hanldePut;
