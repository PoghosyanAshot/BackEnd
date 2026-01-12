const AppError = require("../utils/appError");
const HTTP_STATUS = require("../constants/httpStatus");
const MSG = require("../constants/responseMessages");

const roleMiddleware =
    (...roles) =>
    (req, res, next) => {
        const role = req.user.role;

        if (roles.includes(role)) {
            next();
        } else {
            next(
                new AppError({
                    statusCode: HTTP_STATUS.FORBIDDEN,
                    message: MSG.FORBIDDEN_ROLE,
                })
            );
        }
    };

module.exports = roleMiddleware;
