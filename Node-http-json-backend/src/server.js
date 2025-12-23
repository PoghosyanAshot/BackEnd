require("dotenv").config();
const http = require("node:http");
const { constants } = require("node:http2");

const sendResponse = require("./utils/sendResponse");
const usersRoutes = require("./routes/users.routes");
const ordersRoutes = require("./routes/orders.routes");
const productsRoutes = require("./routes/products.routes");

const routes = [usersRoutes, ordersRoutes, productsRoutes];
const PORT = process.env.PORT;
const HOST = process.env.HOST;

const server = http.createServer(async (req, res) => {
    try {
        for (const rout of routes) {
            if (await rout(req, res)) {
               return;
            }
        }

        sendResponse(res, constants.HTTP_STATUS_BAD_REQUEST, {
            message: "invalid EndPoint",
        });
    } catch (err) {
        sendResponse(res, constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, {
            message: "An unexpected error occurred. Please try again later.",
        });
    }
});

server.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});
