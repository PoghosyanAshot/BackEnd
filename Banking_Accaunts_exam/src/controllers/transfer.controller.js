"use strict";

const service = require("../services/transfer.service");
const response = require("../utils/responseFormatter");
const asyncHandler = require("../utils/asyncHandler");

const transfer = asyncHandler(async (req, res) => {
    const result = await service.transfer(req.body);

    return response.success(res, result);
});

module.exports = { transfer };
