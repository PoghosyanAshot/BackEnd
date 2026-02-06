require("./src/configs/env");

const app = require("./src/app");
const { connectDB } = require("./src/db");
const { PORT, HOST } = require("./src/configs/env");

(async () => {
    try {
        await connectDB();

        app.listen(PORT, HOST, () => {
            console.log(`Server runing on ${HOST}:${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start srever: ", err);
        process.exit(1);
    }
})();