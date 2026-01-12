require('dotenv').config();

const KEY = process.env['X-API-KEY'];

const isValidKey = (req, res, next) => {
    const req_key = req.header("key");
    
    if (req_key === KEY) {
        next();
    } else {
        res.status(400).json({message: "Invalid key!!!"});
    }
};

module.exports = isValidKey;
