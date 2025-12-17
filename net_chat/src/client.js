require("dotenv").config();
const { log } = require("console");
const net = require("net");

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const client = net.createConnection({port: PORT, host: HOST}, () => {
    console.log(`contected to server at ${HOST}:${PORT}`);
});

client.on("data", (data) => {
    console.log(data.toString());
})

process.stdin.on("data", (input) => {
    if (input.toString().trim().toLowerCase() === "exit") {
        console.log("clsoing connection");
        client.end();
        process.exit(0);
    }

    client.write(input);
})
