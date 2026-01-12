const crypto = require("node:crypto");
const HTTP_STATUS = require("../constants/httpStatus");
const MSG = require("../constants/responseMessages");
const AppError = require("../utils/appError");

const jsonStore = require("../utils/jsonStore");
const readData = jsonStore.readData("products.json");
const writeData = jsonStore.writeData("products.json");

const getAll = async () => {
    const data = await readData();

    return {
        message: MSG.OK,
        payload: data,
    };
};

const getById = async (id) => {
    const data = await readData();
    const product = data.find((d) => d.id === id);

    if (!product) {
        throw new AppError({
            statusCode: HTTP_STATUS.NOT_FOUND,
            message: MSG.PRODUCT_NOT_FOUND,
        });
    }

    return {
        message: MSG.OK,
        payload: data,
    };
};

const create = async (reqData) => {
    const { name, price, stock } = reqData;
    const data = await readData();

    const newData = {
        id: crypto.randomUUID(),
        name,
        price,
        stock,
        createdAt: new Date().toISOString(),
    };

    data.push(newData);
    await writeData(data);

    return {
        message: MSG.PRODUCT_CREATED,
        payload: {
            id: newData.id,
            name: newData.name,
            price: newData.price,
            stock: newData.stock,
            createdAt: newData.createdAt,
        },
    };
};

const update = async (reqData) => {
    const { id, name, price, stock } = reqData;
    const data = await readData();
    const product = data.find((d) => d.id === id);

    if (!product) {
        throw new AppError({
            statusCode: HTTP_STATUS.BAD_REQUEST,
            message: MSG.PRODUCT_NOT_FOUND,
        });
    }

    if (name) {
        product.name = name;
    }

    if (price) {
        product.price = price;
    }

    if (stock) {
        product.stock = stock;
    }

    await writeData(data);

    return {
        message: MSG.PRODUCT_UPDATED,
    };
};

const remove = async (id) => {
    const data = await readData();
    const updatedData = data.filter((d) => d.id !== id);

    if (data.length === updatedData.length) {
        throw new AppError({
            statusCode: HTTP_STATUS.BAD_REQUEST,
            message: MSG.PRODUCT_NOT_FOUND,
        });
    }

    await writeData(updatedData);
    
    return {
        message: MSG.PRODUCT_DELETED,
    }
};

module.exports = { getAll, getById, create, update, remove };
