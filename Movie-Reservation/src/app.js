"use stirct";

const express = require("express");
const loggerMiddleware = require("./middlewares/logger.middleware");
const errorMiddleware = require("./middlewares/error.middleware");
const usersRouter = require("./routes/users.routes");

const app = express();
app.use(loggerMiddleware);

app.use("/users", usersRouter);

// error base middleware
app.use(errorMiddleware);

module.exports = app;
