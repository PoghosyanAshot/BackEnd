"use strict";

const router = require("express").Router();
const controller = require("../controllers/customer.controller");
const validate = require("../middlewares/validate.middleware");
const customerValidation = require("../validations/customer.validation");

router.post("/", validate(customerValidation), controller.createCustomer);

router.get("/", controller.getAllCustomers);

router.get("/:id", controller.getCustomerById);

module.exports = router;
