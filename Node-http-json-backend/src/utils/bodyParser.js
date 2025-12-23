const bodyParser = async (req) => {
    let body = "";

    await new Promise((resolve, reject) => {
        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {
            resolve();
        });

        req.on("error", (err) => {
            reject(err);
        });
    });

    const data = body.trim();

    if (data === "") {
        return null;
    }

    return JSON.parse(data);
};

module.exports = bodyParser;
