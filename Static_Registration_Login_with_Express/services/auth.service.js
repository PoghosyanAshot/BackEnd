"use strict";

const crypto = require("node:crypto");
const bcrypt = require("bcrypt");
const { HTTP_STATUS, MSG } = require("../constants/constants");
const jsonStore = require("../utils/jsonStore");
const ServerError = require("../utils/serverError");
const readData = jsonStore.readData("users.json");
const writeData = jsonStore.writeData("users.json");

const hashPassword = async (password) => {
    const saltRounds = 10;

    try {
        const hashPassword = await bcrypt.hash(password, saltRounds);
        return hashPassword;
    } catch (err) {
        throw new ServerError({
            statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: MSG.INTERNAL_ERROR,
            errors: [MSG.INTERNAL_ERROR],
            cause: err,
        });
    }
};

const verifyPassword = async (password, storedHash) => {
    try {
        return await bcrypt.compare(password, storedHash);
    } catch (err) {
        throw new ServerError({
            statusCode: HTTP_STATUS.BAD_REQUEST,
            message: MSG.PASSWORD_INVALID,
            errors: [MSG.PASSWORD_INVALID],
        });
    }
};

const register = async (data, file) => {
    const users = await readData();

    if (users.some((user) => user.email === data.email)) {
        throw new ServerError({
            statusCode: HTTP_STATUS.BAD_REQUEST,
            message: MSG.DUPLICATE_EMAIL,
            errors: [MSG.DUPLICATE_EMAIL],
        });
    }

    const newUser = {
        id: crypto.randomUUID(),
        fullName: data.fullName,
        email: data.email,
        password: await hashPassword(data.password),
        college: data.college || "",
        hobby: data.hobby || "",
        phone: data.phone || "",
        age: data.age || "",
        city: data.city || "",
        github: data.github || "",
        bio: data.bio || "",
        createdAt: new Date().toISOString(),
        imageUrl: file ? `/uploads/${file.filename}` : "",
    };

    const result = {
        ok: true,
        message: MSG.REGISTER_SUCCESS,
        payload: {
            fullName: newUser.fullName,
            email: newUser.email,
        },
    };

    if (newUser.imageUrl) {
        result.payload.imageUrl = newUser.imageUrl;
    }

    users.push(newUser);
    await writeData(users);

    return result;
};

const login = async (data) => {
    const { email, password } = data;
    const users = await readData();
    const user = users.find((u) => u.email === email);

    if (!user) {
        throw new ServerError({
            statusCode: HTTP_STATUS.BAD_REQUEST,
            message: MSG.INVALID_CREDENTIALS,
            errors: [MSG.INVALID_CREDENTIALS],
        });
    }

    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
        throw new ServerError({
            statusCode: HTTP_STATUS.BAD_REQUEST,
            message: MSG.INVALID_CREDENTIALS,
            errors: [MSG.INVALID_CREDENTIALS],
        });
    }

    const result = {
        ok: true,
        message: MSG.LOGIN_SUCCESS,
    };

    return result;
};

module.exports = { register, login };
