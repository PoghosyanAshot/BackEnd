const { application } = require("express");
const HTTP_STATUS = require("../constants/httpStatus");
const MSG = require("../constants/responseMessages");
const AppError = require("../utils/appError");

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_RE = /^[A-Za-z0-9]{8,}$/;

const validateEmailAndPassword = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(
            new AppError({
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: MSG.INVALID_CREDENTIALS,
            })
        );
    }

    if (!EMAIL_RE.test(email)) {
        return next(
            new AppError({
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: MSG.INVALID_EMAIL,
            })
        );
    }

    if (!PASSWORD_RE.test(password)) {
        return next(
            new AppError({
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: MSG.INVALID_PASSWORD,
            })
        );
    }

    next();
};

const validateCreateProduct = (req, res, next) => {
    const { name, price, stock } = req.body;

    if (!name || !price || !stock) {
        return next(
            new AppError({
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: MSG.INVALID_PRODUCT_DATA,
            })
        );
    }

    if (typeof name !== "string") {
        return next(
            new AppError({
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: MSG.INVALID_NAME,
            })
        );
    }

    if (typeof price !== "number" || price <= 0) {
        return next(
            new AppError({
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: MSG.INVALID_PRICE,
            })
        );
    }

    if (typeof stock !== "number" || stock <= 0) {
        return next(
            new AppError({
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: MSG.INVALID_STOCK,
            })
        );
    }

    next();
};

const validateUpdateProduct = (req, res, next) => {
    const { name, price, stock } = req.body;

    if (name) {
        if (typeof name !== "string") {
            return next(
                new AppError({
                    statusCode: HTTP_STATUS.BAD_REQUEST,
                    message: MSG.INVALID_NAME,
                })
            );
        }
    }

    if (price) {
        if (typeof price !== "number" || price <= 0) {
            return next(
                new AppError({
                    statusCode: HTTP_STATUS.BAD_REQUEST,
                    message: MSG.INVALID_PRICE,
                })
            );
        }
    }

    if (stock) {
        if (typeof stock !== "number" || stock <= 0) {
            return next(
                new AppError({
                    statusCode: HTTP_STATUS.BAD_REQUEST,
                    message: MSG.INVALID_STOCK,
                })
            );
        }
    }

    next();
};

const validateCreateOrder = (req, res, next) => {
    const { items } = req.body;

    if (!items) {
        return next(
            new AppError({
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: MSG.EMPTY_ORDER_ITEMS,
            })
        );
    }

    if (!Array.isArray(items)) {
        return next(
            new AppError({
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: MSG.INVALID_TYPE_ITEMS,
            })
        );
    }

    if (items.length <= 0) {
        return next(
            new AppError({
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: MSG.EMPTY_ORDER_ITEMS,
            })
        );
    }

    for (let i = 0; i < items.length; ++i) {
        const { productId, quantity } = items[i];

        if (!productId || quantity === undefined) {
            return next(
                new AppError({
                    statusCode: HTTP_STATUS.BAD_REQUEST,
                    message: MSG.INVALID_ORDER_DATA,
                })
            );
        }

        if (typeof quantity !== "number" || quantity < 1) {
            return next(
                new AppError({
                    statusCode: HTTP_STATUS.BAD_REQUEST,
                    message: MSG.INVALID_QUANTITY,
                })
            );
        }
    }

    next();
};

module.exports = {
    validateEmailAndPassword,
    validateCreateProduct,
    validateUpdateProduct,
    validateCreateOrder,
};
