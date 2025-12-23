const METHODS = require("../../../constants/methods");

const createUserData = (body, data, newData, method, id) => {
    const { name, email, role } = body;

    if (method === METHODS.POST) {
        newData.id = data.length;
    } else {
        newData.id = data[id].id;
    }

    newData.name = name;
    newData.email = email;
    newData.role = role;
    newData.createdAt = new Date(Date.now()).toString();
    newData.updatedAt = new Date(Date.now()).toString();
    newData.isDeleted = false;
};

const createOrderData = (body, data, newData, method, id) => {
    const { title, amount } = body;

    if (method === METHODS.POST) {
        newData.id = data.length;
    } else {
        newData.id = data[id].id;
    }

    newData.title = title;
    newData.amount = amount;
    newData.status = "pending";
    newData.createdAt = new Date(Date.now()).toString();
    newData.updatedAt = new Date(Date.now()).toString();
    newData.isDeleted = false;
};

const createProductData = (body, data, newData, method, id) => {
    const { title, price, instock } = body;

    if (method === METHODS.POST) {
        newData.id = data.length;
    } else {
        newData.id = data[id].id;
    }

    newData.title = title;
    newData.price = price;
    newData.instock = instock;
    newData.createdAt = new Date(Date.now()).toString();
    newData.updatedAt = new Date(Date.now()).toString();
    newData.isDeleted = false;
};

module.exports = { createUserData, createOrderData, createProductData };
