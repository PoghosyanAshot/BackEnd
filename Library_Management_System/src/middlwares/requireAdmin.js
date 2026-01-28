"use strict";

const HTTP = require("../../constants/httpStatus");
const MSG = require("../../constants/respnoseMessages");

const requireAdmin = (req, res, next) => {
    const user = req.user;

    if (!user) {
        return res.redirect("login");
    }

    if (req.user.role !== "admin") {
        return res.status(HTTP.FORBIDDEN).render("pages/403", {
            title: MSG.FORBIDDEN,
            currentUser: user,
            error: null,
        });
    }

    next();
};

module.exports = requireAdmin;
