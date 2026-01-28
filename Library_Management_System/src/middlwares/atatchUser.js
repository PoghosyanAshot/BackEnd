"use strict";

const jwt = require("jsonwebtoken");
const { findUserById } = require("../services/user.service");

const attachUser = async (req, res, next) => {
    try {
        const token = req.cookies.auth_token;

        if (!token) {
            ((req.user = null), (res.locals.currentUser = null));
            return next();
        }

        const payload = jwt.verify(token, process.env.JWT_KEY);
        const user = await findUserById(payload.userId);

        if (!user) {
            res.clearCookie("auth_token");
            req.user = null;
            res.locals.currentUser = null;
            return next();
        }

        req.user = user;
        res.locals.currentUser = user;
        next();
    } catch {
        res.clearCookie("auth_token");
        req.user = null;
        res.locals.currentUser = null;
        next();
    }
};

module.exports = attachUser;
