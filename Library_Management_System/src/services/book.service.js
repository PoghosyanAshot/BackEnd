"use strict";

const { read, write } = require("../utils/jsonStore");
const DATA_NAMES = require("../../constants/dataNames");
const crypto = require("node:crypto");

const getAllBooks = async () => {
    return await read(DATA_NAMES.BOOKS);
};

const getBookById = async (id) => {
    const books = await read(DATA_NAMES.BOOKS);
    const book = books.find((b) => b.id === id);
    return book;
};

const create = async (data) => {
    const { title, author, year } = data;
    const books = await read(DATA_NAMES.BOOKS);

    const book = {
        id: crypto.randomUUID(),
        title,
        author,
        year,
        available: true,
        createdAt: new Date().toISOString(),
    };

    books.push(book);
    await write(DATA_NAMES.BOOKS, books);
};

const update = async (data, id) => {
    const title = (data.title || "").trim();
    const author = (data.author || "").trim();
    const year = Number((data.year || "").trim());
    const books = await read(DATA_NAMES.BOOKS);
    const book = books.find((b) => b.id === id);

    if (title) {
        book.title = title;
    }

    if (author) {
        book.author = author;
    }

    if (year) {
        book.year = year;
    }

    await write(DATA_NAMES.BOOKS, books);
};

const deleteBook = async (id) => {
    const books = await read(DATA_NAMES.BOOKS);
    const newBooks = books.filter((b) => b.id !== id);
    await write(DATA_NAMES.BOOKS, newBooks);
}

module.exports = { getAllBooks, getBookById, create, update, deleteBook };
