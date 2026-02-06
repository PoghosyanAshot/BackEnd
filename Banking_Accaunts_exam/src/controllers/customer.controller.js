"use strict";

const service = require("../services/customer.service");
const response = require("../utils/responseFormatter");
const asyncHandler = require("../utils/asyncHandler");

const createCustomer = asyncHandler(async (req, res) => {
    const customer = await service.createCustomer(req.body);

    return response.created(res, customer);
});

const getCustomerById = asyncHandler(async (req, res) => {
    const id = Number(req.params.id);

    const customer = await service.getCustomerById(id);

    return response.success(res, customer);
});

const getAllCustomers = asyncHandler(async (req, res) => {
    const customers = await service.getAllCustomers();

    return response.success(res, customers);
});

module.exports = {
    createCustomer,
    getCustomerById,
    getAllCustomers,
};
