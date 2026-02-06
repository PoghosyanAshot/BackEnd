"use strict";

const router = require("express").Router();

const controller = require("../controllers/audit.controller");

router.get("/", controller.getAuditLogs);

module.exports = router;
