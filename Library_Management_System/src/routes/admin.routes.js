"use stirct";

const express = require("express");
const router = express.Router();
const HTTP = require("../../constants/httpStatus");
const MSG = require("../../constants/respnoseMessages");
const validateBookForm = require("../middlwares/validateBookForm");
const bookController = require("../controllers/book.controller");
const { getBookById } = require("../services/book.service");
const userService = require('../services/user.service');

router.get("/", (req, res) => {
    res.render("pages/admin-dashboard.ejs", {
        title: "Admin Dashboard",
        currentUser: req.user || null,
        error: null,
    });
});

router.get("/users", async (req, res) => {
    const users = await userService.getAllUsers();

    res.render("pages/admin-users", {
        title: "Users",
        users,
        currentUser: req.user,
        error: null
    })
})

router.post("/users/:id/make-admin", async (req, res) => {
    const id = req.params.id;
    await userService.makeAdmin(id);
    res.redirect("/admin/users");
})

router.get("/books/new", (req, res) => {
    res.render("pages/admin-book-form", {
        title: "Add Book",
        book: null,
        currentUser: req.user,
        error: null,
    });
});

router.post("/books", validateBookForm, bookController.create);
router.get("/books/:id/edit", async (req, res) => {
    const id = req.params.id;
    const book = await getBookById(id);

    res.render("pages/admin-book-form", {
        title: "Edit Book",
        book,
        currentUser: req.user,
        error: null,
    });
});
router.post("/books/:id", bookController.update);
router.post("/books/:id/delete", bookController.deleteBook);

module.exports = router;
