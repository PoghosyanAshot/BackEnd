const http = require("node:http");

const server = http.createServer((req, res) => {});

server.listen(3001, () => {
    console.log("server runing on port 3001");
    res.writeHead(200, "Ok");
    res.end("hello world");
});
