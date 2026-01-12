const AppError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHandler");
const authService = require("../services/auth.service");

const HTTP_STATUS = require("../constants/httpStatus");
const MSG = require("../constants/responseMessages");

const register = asyncHandler(async (req, res) => {
    const { email, password, role } = req.body;

    const data = await authService.register({ email, password, role });

    res.status(HTTP_STATUS.CREATED).json(data);
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const data = await authService.login({ email, password });

    res.status(HTTP_STATUS.OK).json(data);
});

module.exports = { register, login };
