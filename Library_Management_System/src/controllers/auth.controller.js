"use strict";

const asyncHandler = require("../utils/asyncHandler");
const HTTP = require("../../constants/httpStatus");
const authService = require("../services/auth.service");

const register = asyncHandler(async (req, res) => {
    const data = req.validData;

    await authService.register(data);

    return res.redirect("/login");
});

const login = asyncHandler(async (req, res) => {
    const data = req.validData;

    const token = await authService.login(data);
    res.cookie("auth_token", token, {
        httpOnly: true,
        sameSite: "lax",
    });

    return res.redirect("/books");
});

module.exports = { register, login };
