"use strict";

const HTTP = require("../../constants/httpStatus");
const MSG = require("../../constants/respnoseMessages");

const printCause = (err, level = 0) => {
    if (!err) return;

    const indent = "  ".repeat(level);
    console.error(`${indent}↳ Cause: ${err.message}`);

    if (err.cause) {
        printCause(err.cause, level + 1);
    }
};

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || HTTP.INTERNAL_SERVER_ERROR;
    const message = err.message || MSG.SERVER_ERROR;

    if (statusCode >= HTTP.INTERNAL_SERVER_ERROR) {
        console.error("\n[ERROR]");
        console.error(`${req.method} ${req.originalUrl}`);
        console.error("Message:", err.message);
        console.error("Stack:", err.stack);

        if (err.cause) {
            console.error("Caused by:");
            printCause(err.cause);
        }
    }

    // EJS rendering
    if (req.headers.accept && req.headers.accept.includes("text/html")) {
        if (statusCode === HTTP.FORBIDDEN) {
            return res
                .status(statusCode)
                .render("pages/403", { title: MSG.FORBIDDEN, currentUser: null, error: null });
        }

        if (statusCode === HTTP.NOT_FOUND) {
            return res.status(statusCode).render("pages/404", {
                title: MSG.NOT_FOUND,
                currentUser: req.user || null,
                error: null,
            });
        }

        if (statusCode >= HTTP.BAD_REQUEST && statusCode < HTTP.INTERNAL_SERVER_ERROR) {
            const page = req.originalUrl.includes("login") ? "pages/login" : "pages/register";

            return res.status(statusCode).render(page, {
                title: page.includes("login") ? "Login" : "Register",
                currentUser: null,
                error: message,
            });
        }

        return res.status(statusCode).render("pages/404", {
            title: message,
            currentUser: req.user || null,
            error: message,
        });
    }

    res.status(statusCode).json({
        message,
    });
};

module.exports = errorHandler;
