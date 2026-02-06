"use strict";

const service = require("../services/audit.service");
const response = require("../utils/responseFormatter");
const asyncHandler = require("../utils/asyncHandler");

const getAuditLogs = asyncHandler(async (req, res) => {

    const logs = await service.getAuditLogs();

    return response.success(res, logs);
});

module.exports = {
    getAuditLogs
};