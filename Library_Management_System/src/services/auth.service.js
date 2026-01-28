"use strict";

const { read, write } = require("../utils/jsonStore");
const DATA_NAMES = require("../../constants/dataNames");
const AppError = require("../utils/AppError");
const HTTP = require("../../constants/httpStatus");
const MSG = require("../../constants/respnoseMessages");
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const jwt = require("jsonwebtoken");
const { findUserById, findUserByEmail } = require("./user.service");

const hashPassword = async (password) => {
    const saltRounds = 10;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (err) {
        throw new AppError({
            statusCode: HTTP.INTERNAL_SERVER_ERROR,
            message: MSG.INTERNAL_SERVER_ERROR,
            cause: err,
        });
    }
};

const register = async (data) => {
    const { name, email, password } = data;
    const users = await read(DATA_NAMES.USERS);

    // check is email unique
    if (users.some((u) => u.email === email)) {
        throw new AppError({
            statusCode: HTTP.CONFLICT,
            message: MSG.EMAIL_ALREADY_EXISTS,
        });
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    const newUser = {
        id: crypto.randomUUID(),
        name: name,
        email: email,
        password: hashedPassword,
        role: "member",
        createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    await write(DATA_NAMES.USERS, users);

    return true;
};

const login = async (data) => {
    const { email, password } = data;

    const user = await findUserByEmail(email);

    if (!user) {
        throw new AppError({
            statusCode: HTTP.UNAUTHORIZED,
            message: MSG.INVALID_CREDENTIALS,
        });
    }

    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
        throw new AppError({
            statusCode: HTTP.BAD_REQUEST,
            message: MSG.INVALID_CREDENTIALS,
        });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return token;
};

module.exports = { register, login };
