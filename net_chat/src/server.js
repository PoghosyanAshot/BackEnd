require("dotenv").config();
const { log } = require("console");
const net = require("net");

const PORT = process.env.PORT;
const HOST = process.env.HOST;
const clients = new Set();

const broadCast = (socket, msg) => {
    for (const client of clients) {
        if (client != socket) {
            client.write(msg);
        }
    }
};

const server = net.createServer((socket) => {
    console.log("Client connecnted");
    clients.add(socket);

    socket.on("data", (data) => {
        broadCast(socket, data);
    });
});

server.listen(PORT, HOST, () => {
    console.log(`TCP server running on ${HOST}:${PORT}`);
});
