const HTTP_STATUS = require("../constants/httpStatus");
const orderService = require("../services/order.service");
const asyncHandler = require("../utils/asyncHandler");

const getMine = asyncHandler(async (req, res) => {
    const id = req.user.id;

    const data = await orderService.getMine(id);

    return res.status(HTTP_STATUS.OK).json(data);
});

const getAll = asyncHandler(async (req, res) => {
    const data = await orderService.getAll();

    return res.status(HTTP_STATUS.OK).json(data);
});

const create = asyncHandler(async (req, res) => {
    const { items } = req.body;
    const user = req.user;

    const data = await orderService.create(items, user);

    return res.status(HTTP_STATUS.CREATED).json(data);
});

module.exports = { getMine, getAll, create };
