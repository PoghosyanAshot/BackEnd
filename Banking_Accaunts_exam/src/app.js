"use strict";

const express = require("express");
const loggerMiddleware = require("./middlewares/logger.middleware");
const errorMiddleware = require("./middlewares/error.middleware");
const customerRouter = require("./routes/customer.routes");
const accountRouter = require("./routes/account.routes");
const auditLogsRouter = require("./routes/audit.routes");
const transferRouter = require("./routes/transfer.routes");
const transactionRouter = require("./routes/transaction.routes");
const app = express();

app.use(express.json());
app.use(loggerMiddleware);

app.use("/customers", customerRouter);
app.use("/accounts", accountRouter);
app.use("/audit-logs", auditLogsRouter);
app.use("/transfers", transferRouter);
app.use("/transactions", transactionRouter);

// if rout not found
app.use((req, res, next) => {
    return res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`,
    });
});

// error middlewar
app.use(errorMiddleware);

module.exports = app;
