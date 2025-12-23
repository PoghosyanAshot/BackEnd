const fs = require("node:fs");

const writeFile = (path, msg) => {
    fs.writeFileSync(path, msg);
}

module.exports = writeFile;