const crypto = require("node:crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const HTTP_STATUS = require("../constants/httpStatus");
const MSG = require("../constants/responseMessages");
const jsonStore = require("../utils/jsonStore");
const FILE_NAME = "users.json";
const API_KEY = process.env.API_KEY;
const API_EXP = process.env.API_EXP;

const readData = jsonStore.readData(FILE_NAME);
const writeData = jsonStore.writeData(FILE_NAME);

const hashPassword = async (password) => {
    const saltRounds = 10;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch {
        throw new AppError({
            statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: MSG.INTERNAL_ERROR,
        });
    }
};

const verifyPassword = async (password, storedHash) => {
    try {
        return await bcrypt.compare(password, storedHash);
    } catch {
        throw new AppError({
            statusCode: HTTP_STATUS.BAD_REQUEST,
            message: MSG.INVALID_CREDENTIALS,
        });
    }
};

const register = async (reqData) => {
    const { email, password, role } = reqData;
    const data = await readData();

    if (data.some((user) => user.email === email)) {
        throw new AppError({
            statusCode: HTTP_STATUS.CONFLICT,
            message: MSG.EMAIL_ALREADY_EXISTS,
        });
    }

    const newData = {
        id: crypto.randomUUID(),
        email: email,
        password: await hashPassword(password),
        role: ["admin", "customer"].includes(role) ? role : "customer",
        createdAt: new Date().toISOString(),
    };

    data.push(newData);
    await writeData(data);

    return {
        message: MSG.REGISTER_SUCCESS,
        payload: {
            id: newData.id,
            email: newData.email,
            role: newData.role,
            createdAt: newData.createdAt,
        },
    };
};

const login = async (reqData) => {
    const { email, password } = reqData;
    const data = await readData();
    const user = data.find((user) => user.email === email);

    if (!user) {
        throw new AppError({
            statusCode: HTTP_STATUS.BAD_REQUEST,
            message: MSG.INVALID_CREDENTIALS,
        });
    }

    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
        throw new AppError({
            statusCode: HTTP_STATUS.BAD_REQUEST,
            message: MSG.INVALID_CREDENTIALS,
        });
    }

    const payload = {
        id: user.id,
        role: user.role,
    };

    const token = jwt.sign(payload, API_KEY, { expiresIn: API_EXP });

    return {
        message: MSG.LOGIN_SUCCESS,
        payload: { token },
    };
};

module.exports = { register, login };