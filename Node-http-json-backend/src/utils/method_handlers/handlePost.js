const { constants } = require("node:http2");
const creators = require("./update-&-create_data/dataCreators");
const METHODS = require("../../constants/methods");
const PRODUCTS = require("../../constants/products");

const sendResponse = require("../sendResponse");
const writeFile = require("../writeFile");
const isValidData = require("./helpers_for_handlers/isValidData");
const bodyParser = require("../bodyParser");

const handlePost = async (req, res, data, path, hint, id) => {
    if (id) {
        return sendResponse(res, constants.HTTP_STATUS_BAD_REQUEST, {
            message: "Invalid EndPoint",
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

    if (isValidData(body, data, hint, METHODS.POST)) {
        try {
            const newData = {};

            switch (hint) {
                case PRODUCTS.USERS:
                    creators.createUserData(body, data, newData, METHODS.POST);
                    break;
                case PRODUCTS.ORDERS:
                    creators.createOrderData(body, data, newData, METHODS.POST);
                    break;
                case PRODUCTS.PRODUCTS:
                    creators.createProductData(body, data, newData, METHODS.POST);
                    break;
            }

            data.push(newData);
            writeFile(path, JSON.stringify(data));
            sendResponse(res, constants.HTTP_STATUS_CREATED, body);
        } catch (error) {
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

module.exports = handlePost;
