"use strict";

const loanService = require("../services/loan.service");
const asyncHandler = require("../utils/asyncHandler");

const borrow = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const bookId = req.params.id;
    await loanService.borrow(userId, bookId);

    return res.redirect("/books");
});

const returnBook = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const bookId = req.params.id;
    await loanService.returnBook(userId, bookId);

    return res.redirect("/books");
});

module.exports = { borrow, returnBook };
