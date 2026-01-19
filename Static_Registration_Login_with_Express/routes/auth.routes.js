"use strict";

const express = require("express");
const validators = require("../middlewares/validation");
const authController = require("../controllers/auth.controller");
const router = express.Router();

router.post("/register", validators.validateUserData, authController.register);
router.post("/login", validators.validateLoginData, authController.login);

module.exports = router;
