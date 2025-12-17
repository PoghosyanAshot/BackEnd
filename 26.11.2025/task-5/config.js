const PORT = 5460;
const URL = "http://localhost:5460/app";
const isProduction = process.env.NODE_ENV === "production";
const getEnvironmentInfo = () => {
    return {
        port: PORT,
        database: URL,
        production: isProduction,
        nodeENV: process.env.NODE_ENV || "development",
    };
};

module.exports = {PORT, URL, isProduction, getEnvironmentInfo};
