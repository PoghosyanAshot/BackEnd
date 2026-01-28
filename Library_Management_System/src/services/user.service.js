"use strict";

const { read, write } = require("../utils/jsonStore");
const DATA_NAMES = require("../../constants/dataNames");
const AppError = require("../utils/AppError");
const HTTP = require("../../constants/httpStatus");
const MSG = require("../../constants/respnoseMessages");

const getAllUsers = async () => {
    const users = await read(DATA_NAMES.USERS);
    return users;
};

const findUserById = async (id) => {
    if (!id) {
        return null;
    }

    const users = await read(DATA_NAMES.USERS);
    const user = users.find((u) => u.id === id);
    return user || null;
};

const findUserByEmail = async (email) => {
    const users = await read(DATA_NAMES.USERS);
    const user = users.find((u) => u.email === email);
    return user || null;
};

const makeAdmin = async (id) => {
    const users = await read(DATA_NAMES.USERS);
    const user = users.find((u) => u.id === id);

    if (!user) {
        throw new AppError({
            statusCode: HTTP.BAD_REQUEST,
            message: MSG.USER_NOT_FOUND,
        });
    }

    user.role = "admin";

    await write(DATA_NAMES.USERS, users);
};

module.exports = { findUserByEmail, findUserById, getAllUsers, makeAdmin };
