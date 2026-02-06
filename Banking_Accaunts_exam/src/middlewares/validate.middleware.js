"use strict";

const ValidationError = require("../errors/ValidationError");

const validate = (schema) => {
    return (req, res, next) => {
        const errors = [];

        for (const field in schema) {
            const validator = schema[field];
            const value = req.body[field];

            const isValid = validator(value, req.body);

            if (!isValid) {
                errors.push(`Invalid ${field}`);
            }
        }

        if (errors.length > 0) {
            return next(new ValidationError(errors.join(", ")));
        }

        next();
    };
};

module.exports = validate;
