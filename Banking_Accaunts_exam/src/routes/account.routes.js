"use strict";

const router = require("express").Router();
const controller = require("../controllers/account.controller");

const validate = require("../middlewares/validate.middleware");

const accountValidation = require("../validations/account.validation");
const statusValidation = require("../validations/accountStatus.validation");

router.post("/", validate(accountValidation), controller.createAccount);

router.get("/:id", controller.getAccountById);

router.patch("/:id/status", validate(statusValidation), controller.updateAccountStatus);

module.exports = router;
