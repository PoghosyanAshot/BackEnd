"use strict";

const asyncHandler = require("../utils/asyncHandler");
const bookService = require("../services/book.service");

const create = asyncHandler(async (req, res) => {
    const data = req.validData;

    await bookService.create(data);

    res.redirect("/books");
});

const update = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    await bookService.update(data, id);
    res.redirect("/books");
})

const deleteBook = asyncHandler(async (req, res) => {
    const id = req.params.id;
    await bookService.deleteBook(id);
    res.redirect("/books");
})

module.exports = { create, update, deleteBook };
