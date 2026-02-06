"use strict";

const repo = require("../repositories/audit.repo");

const createAuditLog = async (data, client = null) => {
    return repo.createAuditLog(data, client);
};

const getAuditLogs = async () => {
    return repo.getAuditLogs();
};

module.exports = {
    createAuditLog,
    getAuditLogs,
};
