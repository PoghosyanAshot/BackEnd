"use strict";

const router = require("express").Router();

const controller = require("../controllers/transaction.controller");

const validate = require("../middlewares/validate.middleware");
const txValidation = require("../validations/transaction.validation");

router.get("/accounts/:id/transactions", controller.getAccountTransactions);

router.get("/reference/:reference", validate(txValidation), controller.getTransactionByReference);

module.exports = router;
