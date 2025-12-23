const path = require("node:path");
const fs = require('node:fs');

const pathFile = path.join(__dirname, "..", "data", "tasks.json");

const writeFile = (data) => {
    fs.writeFileSync(pathFile, JSON.stringify(data));
};

module.exports = writeFile;