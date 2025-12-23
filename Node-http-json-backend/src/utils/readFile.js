const fs = require('node:fs');

const readFile = (path) => {
    return JSON.parse(fs.readFileSync(path));
}

module.exports = readFile;