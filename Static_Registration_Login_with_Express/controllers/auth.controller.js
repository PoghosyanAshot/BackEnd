"use strict";

const asyncHandler = require("../utils/asyncHandler");
const authService = require("../services/auth.service");
const { HTTP_STATUS } = require("../constants/constants");

const register = asyncHandler(async (req, res) => {
    const { body, file } = req;

    const result = await authService.register(body, file);

    res.status(HTTP_STATUS.CREATED).json(result);
});

const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const result = await authService.login({email, password});

    res.status(HTTP_STATUS.OK).json(result);
})

module.exports = { register, login };
