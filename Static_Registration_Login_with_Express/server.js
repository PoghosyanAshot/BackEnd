"use strict";

require("dotenv").config({ quiet: true });
const express = require("express");
const { HTTP_STATUS, MSG } = require("./constants/constants");
const errorHandler = require("./middlewares/errorHandler");
const apiRouter = require("./routes/auth.routes");
const upload = require("./middlewares/upload");
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.single("image"));
app.use("/", express.static("public"));

app.use("/api", apiRouter);

app.use((_, res) => {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
        ok: false,
        message: MSG.ROUTE_NOT_FOUND,
    });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server run on port:${PORT}`);
});
