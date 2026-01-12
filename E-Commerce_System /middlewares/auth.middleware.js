const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const HTTP_STATUS = require("../constants/httpStatus");
const MSG = require("../constants/responseMessages");
const API_KEY = process.env.API_KEY;

const authMiddleweare = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        next(
            new AppError({
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: MSG.MISSING_AUTH_HEADER,
            })
        );
    }

    const [bearer, token] = authHeader.split(" ");

    if (bearer != "Bearer") {
        next(
            new AppError({
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: MSG.INVALID_AUTH_SCHEME,
            })
        );
    }

    jwt.verify(token, API_KEY, (err, decode) => {
        if (err) {
            next(
                new AppError({
                    statusCode: HTTP_STATUS.UNAUTHORIZED,
                    message: err.message,
                })
            );
        }

        req.user = decode;
        next();
    });
};

module.exports = authMiddleweare;
