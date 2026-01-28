"use strict";

const express = require("express");
const router = express.Router();
const HTTP = require("../../constants/httpStatus");
const MSG = require("../../constants/respnoseMessages");
const { getAllBooks, getBookById } = require("../services/book.service");
const loanController = require("../controllers/loan.controller");
const loanService = require("../services/loan.service");

router.get("/books", async (req, res) => {
    const books = await getAllBooks();

    res.render("pages/books.ejs", {
        title: "Books",
        books,
        currentUser: req.user || null,
    });
});

router.get("/books/:id", async (req, res) => {
    const userId = req.user.id;
    const bookId = req.params.id;
    const book = await getBookById(bookId);
    const loan = await loanService.getActiveLoanForUser(userId, bookId);

    res.render("pages/book-details", {
        title: book.title,
        book,
        loan,
        currentUser: req.user,
        error: null,
    });
});

router.post("/books/:id/borrow", loanController.borrow);
router.post("/books/:id/return", loanController.returnBook);

module.exports = router;
