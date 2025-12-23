const METHODS = require("../../../constants/methods");
const PRODUCTS = require("../../../constants/products");
const isValidEmail = require('./isValidEmail');

const isValidUserData = (body, data, id, method) => {
    if (!body.name || !body.email || !body.role) return false;

    return isValidEmail(body.email, data, id, method);
};

const isValidOrderData = (body) => {
    return !(!body.title || typeof body.amount !== "number" || body.amount <= 0);
};

const isValidProductData = (body) => {
    return !(
        !body.title ||
        typeof body.price !== "number" ||
        body.price <= 0 ||
        typeof body.inStock !== "boolean"
    );
};

const isValidData = (body, data, hint, method, id) => {
    switch (hint) {
        case PRODUCTS.USERS:
            return isValidUserData(body, data, id, method);
        case PRODUCTS.ORDERS:
            return isValidOrderData(body, data);
        case PRODUCTS.PRODUCTS:
            return isValidProductData(body, data);
    }
};

module.exports = isValidData;
