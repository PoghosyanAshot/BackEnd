"use strict";

const express = require("express");
const router = express.Router();
const validateRegisterForm = require("../middlwares/validateRegisterForm");
const validateLoginForm = require("../middlwares/validateLoginForm");
const authController = require("../controllers/auth.controller");
const HTTP = require("../../constants/httpStatus");
const MSG = require("../../constants/respnoseMessages");

router.get("/", (req, res) => {
    res.render("pages/index", {
        title: "Library",
        currentUser: req.user || null,
    });
});

router.get("/login", (req, res) => {
    res.render("pages/login", {
        title: "Login",
        currentUser: req.user || null,
        error: null,
    });
});

router.get("/register", (req, res) => {
    res.render("pages/register", {
        title: "Register",
        currentUser: req.user || null,
        error: null,
    });
});

router.get("/logout", (req, res) => {
    res.clearCookie("auth_token");
    res.redirect("/login");
});

router.post("/register", validateRegisterForm, authController.register);
router.post("/login", validateLoginForm, authController.login);

module.exports = router;
