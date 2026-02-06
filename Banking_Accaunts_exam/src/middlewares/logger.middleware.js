"use strict";

const logger = require("../utils/logger");

const sanitizeBody = (body) => {
    if (!body || typeof body !== "object") return null;

    const clone = { ...body };

    if (clone.password) clone.password = "***";
    if (clone.token) clone.token = "***";
    if (clone.jwt) clone.jwt = "***";

    return clone;
}

const loggerMiddleware = (req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;

        logger.info({
            type: "REQUEST",
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            durationMs: duration,
            ip: req.ip,
            userAgent: req.headers["user-agent"],
            params: req.params,
            query: req.query,
            body: sanitizeBody(req.body),
        });
    });

    next();
}

module.exports = loggerMiddleware;
