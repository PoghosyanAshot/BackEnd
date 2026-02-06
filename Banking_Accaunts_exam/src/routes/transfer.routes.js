"use strict";

const router = require("express").Router();
const controller = require("../controllers/transfer.controller");

const validate = require("../middlewares/validate.middleware");
const transferValidation = require("../validations/transfer.validation");

router.post("/", validate(transferValidation), controller.transfer);

module.exports = router;
