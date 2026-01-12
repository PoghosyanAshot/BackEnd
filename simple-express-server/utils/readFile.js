const fs = require("node:fs/promises");
const path = require("node:path");

const filePath = path.join(__dirname, "..", "data", "data.json");

const readFile = async () => {
    try {
        const data = await fs.readFile(filePath, "utf8");
        return JSON.parse(data);
    } catch (err) {
        return null;
    }
};

module.exports = readFile;
