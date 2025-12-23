const path = require("node:path");
const { constants } = require("node:http2");

const sendResponse = require("../utils/sendResponse");
const parseUrl = require("../utils/parseUrl");
const readFile = require("../utils/readFile");

const handlers = require("../utils/method_handlers/handlers");
const PRODUCTS = require("../constants/products");
const METHODS = require("../constants/methods");

const filePath = path.join(__dirname, "..", "..", "data", "users.json");

const usersRoutes = async (req, res) => {
    const [product, id] = parseUrl(req.url);

    if (product === PRODUCTS.USERS) {
        try {
            const data = readFile(filePath);
            const method = req.method;

            switch (method) {
                case METHODS.GET:
                    handlers.handleGet(res, id, data);
                    break;
                case METHODS.POST:
                    handlers.handlePost(req, res, data, filePath, PRODUCTS.USERS, id);
                    break;
                case METHODS.PUT:
                    handlers.hanldePut(req, res, id, data, filePath, PRODUCTS.USERS);
                    break;
                case METHODS.PATCH:
                    handlers.handlePatch(req, res, id, data, filePath, PRODUCTS.USERS);
                    break;
                case METHODS.DELETE:
                    handlers.handleDelete(res, id, data, filePath);
                    break;
            }
        } catch (err) {
            sendResponse(res, constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, {
                message: "An unexpected error occurred. Please try again later.",
            });
        }

        return true;
    }
    console.log('hasnuma');
    return false;
};

module.exports = usersRoutes;
