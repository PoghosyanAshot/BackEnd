const METHODS = require("../../../constants/methods");
const STATES = require("../../../constants/states");
const isValidEmail = require("../helpers_for_handlers/isValidEmail");

const updateUserData = (body, data, id) => {
    const { name, email, role } = body;

    if (name) {
        data[id].name = name;
        data[id].updatedAt = new Date(Date.now()).toString();
    }

    if (email) {
        if (!isValidEmail(email, data, id, METHODS.PATCH)) {
            throw "Invalid email";
        }

        data[id].email = email;
        data[id].updatedAt = new Date(Date.now()).toString();
    }

    if (role) {
        data[id].role = role;
        data[id].updatedAt = new Date(Date.now()).toString();
    }
};

const updateOrderData = (body, data, id) => {
    const { title, amount, status } = body;

    if (title) {
        data[id].title = title;
        data[id].updatedAt = new Date(Date.now()).toString();
    }

    if (amount) {
        if (typeof amount !== "number" || amount <= 0) {
            throw "Invalid price";
        }

        data[id].amount = amount;
        data[id].updatedAt = new Date(Date.now()).toString();
    }

    if (status) {
        if (
            !(
                status === STATES.PENDING ||
                status === STATES.COMPLETED ||
                status === STATES.CANCELLED
            )
        ) {
            throw "Invalid status";
        }

        data[id].status = status;
        data[id].updatedAt = new Date(Date.now()).toString();
    }
};

const updateProductData = (body, data, id) => {
    const { title, price, inStock } = body;

    if (title) {
        data[id].title = title;
        data[id].updatedAt = new Date(Date.now()).toString();
    }

    if (price) {
        if (typeof price !== "number" || price <= 0) {
            throw "Invalid price";
        }

        data[id].price = price;
        data[id].updatedAt = new Date(Date.now()).toString();
    }

    if (typeof inStock === "boolean") {
        data[id].inStock = inStock;
        data[id].updatedAt = new Date(Date.now()).toString();
    }
};

module.exports = { updateUserData, updateOrderData, updateProductData };
