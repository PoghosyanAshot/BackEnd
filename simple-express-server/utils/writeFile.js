const fs = require('node:fs/promises');
const path = require('node:path');

const filePath = path.join(__dirname, "..", "data", "data.json");

const writeFile = async(data) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(data));
        return true;
    } catch (err) {
        return false;     
    }
};

module.exports = writeFile;