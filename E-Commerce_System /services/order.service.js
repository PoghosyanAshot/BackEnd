const crypto = require("node:crypto");
const HTTP_STATUS = require("../constants/httpStatus");
const MSG = require("../constants/responseMessages");
const AppError = require("../utils/appError");
const jsonStore = require("../utils/jsonStore");

const readProducts = jsonStore.readData("products.json");
const writeProducts = jsonStore.writeData("products.json");
const readOrders = jsonStore.readData("orders.json");
const writeOrders = jsonStore.writeData("orders.json");

const getMine = async (id) => {
    const orders = await readOrders();
    const data = orders.filter((o) => o.userId === id);

    return {
        message: MSG.OK,
        payload: data,
    };
};

const getAll = async () => {
    const data = await readOrders();

    return {
        message: MSG.OK,
        payload: data,
    };
};

const create = async (items, user) => {
    const size = items.length;
    const products = await readProducts();
    const orders = await readOrders();

    for (let i = 0; i < size; ++i) {
        const product = products.find((p) => p.id === items[i].productId);

        if (!product) {
            throw new AppError({
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: MSG.PRODUCT_NOT_FOUND,
            });
        }

        if (product.stock - items[i].quantity < 0) {
            throw new AppError({
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: MSG.INSUFFICIENT_STOCK,
            });
        }

        product.stock -= items[i].quantity;
        items[i].priceAtPurchase = product.price;
    }

    const newOrder = {
        id: crypto.randomUUID(),
        userId: user.id,
        items,
        totalAmount: items.reduce((acc, val) => acc + val.priceAtPurchase * val.quantity, 0),
        status: "created",
        createdAt: new Date().toISOString(),
    };

    orders.push(newOrder);

    await writeProducts(products);
    await writeOrders(orders);

    return {
        message: MSG.ORDER_CREATED,
        payload: newOrder,
    };
};

module.exports = { getMine, getAll, create };
