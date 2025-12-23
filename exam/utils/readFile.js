const path = require("node:path");
const fs = require('node:fs');

const pathFile = path.join(__dirname, "..", "data", "tasks.json");

const readFile = () => {
    return JSON.parse(fs.readFileSync(pathFile));
};

module.exports = readFile;
