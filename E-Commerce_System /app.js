require("dotenv").config({ quiet: true });
const express = require("express");
const authRouter = require("./routes/auth.routes");
const productRouter = require('./routes/product.routes');
const orderRouter = require('./routes/order.routes');
const errorHandler = require("./middlewares/errorHandler");

const HTTP_STATUS = require("./constants/httpStatus");
const MSG = require("./constants/responseMessages");
const PORT = process.env.PORT;
const HOST = process.env.HOST;

const app = express();
app.use(express.json());

app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

app.use((_, res) => {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: MSG.ROUTE_NOT_FOUND,
    });
});

app.use(errorHandler);

app.listen(PORT, HOST, () => {
    console.log(`The server run on ${HOST}:${PORT}`);
});