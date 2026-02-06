"use strict";

const repo = require("../repositories/customer.repo");
const NotFoundError = require("../errors/NotFoundError");

const createCustomer = async (data) => {
    return repo.createCustomer(data);
};

const getCustomerById = async (id) => {
    const customer = await repo.getCustomerById(id);

    if (!customer) {
        throw new NotFoundError("Customer not found");
    }

    return customer;
};

const getAllCustomers = async () => {
    return repo.getAllCustomers();
};

module.exports = {
    createCustomer,
    getCustomerById,
    getAllCustomers,
};
