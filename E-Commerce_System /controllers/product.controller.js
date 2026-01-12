const HTTP_STATUS = require("../constants/httpStatus");
const MSG = require("../constants/responseMessages");
const asyncHandler = require("../utils/asyncHandler");
const productService = require("../services/product.service");

const getAll = asyncHandler(async (req, res) => {
    const data = await productService.getAll();

    return res.status(HTTP_STATUS.OK).json(data);
});

const getById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const data = await productService.getById(id);

    return res.status(HTTP_STATUS.OK).json(data);
});

const create = asyncHandler(async (req, res) => {
    const productData = req.body;

    const data = await productService.create(productData);

    return res.status(HTTP_STATUS.CREATED).json(data);
});

const update = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const productData = { id, ...req.body };

    const data = await productService.update(productData);

    return res.status(HTTP_STATUS.OK).json(data);
});

const remove = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const data = await productService.remove(id);

    return res.status(HTTP_STATUS.OK).json(data);
});

module.exports = { getAll, getById, create, update, remove };
