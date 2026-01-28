"use strict";

const crypto = require("node:crypto");
const { read, write } = require("../utils/jsonStore");
const AppError = require("../utils/AppError");
const HTTP = require("../../constants/httpStatus");
const MSG = require("../../constants/respnoseMessages");
const DATA_NAMES = require("../../constants/dataNames");

const getActiveLoanForUser = async (userId, bookId) => {
    const loans = await read(DATA_NAMES.LOANS);

    return (
        loans.find((l) => l.userId === userId && l.bookId === bookId && l.returnedAt === null) ||
        null
    );
};

const getLoansForUser = async (userId) => {
    const loans = await read(DATA_NAMES.LOANS);
    const books = await read(DATA_NAMES.BOOKS);

    const userLoans = loans.filter((l) => l.userId === userId);

    return userLoans.map((loan) => {
        const book = books.find((b) => b.id === loan.bookId);

        return {
            ...loan,
            book,
        };
    });
};

const borrow = async (userId, bookId) => {
    const books = await read(DATA_NAMES.BOOKS);
    const loans = await read(DATA_NAMES.LOANS);

    const book = books.find((b) => b.id === bookId);

    if (!book) {
        throw new AppError({
            statusCode: HTTP.NOT_FOUND,
            message: MSG.BOOK_NOT_FOUND,
        });
    }

    if (!book.available) {
        throw new AppError({
            statusCode: HTTP.BAD_REQUEST,
            message: MSG.BOOK_NOT_AVAILABLE,
        });
    }

    const isBorrowed = loans.find((l) => l.bookId === bookId && !l.returnedAt);

    if (isBorrowed) {
        throw new AppError({
            statusCode: HTTP.BAD_REQUEST,
            message: MSG.BOOK_ALREADY_BORROWED,
        });
    }

    loans.push({
        id: crypto.randomUUID(),
        userId,
        bookId,
        borrowedAt: new Date().toISOString(),
        returnedAt: null,
    });

    book.available = false;

    await write(DATA_NAMES.LOANS, loans);
    await write(DATA_NAMES.BOOKS, books);
};

const returnBook = async (userId, bookId) => {
    const books = await read(DATA_NAMES.BOOKS);
    const loans = await read(DATA_NAMES.LOANS);
    const book = books.find((b) => b.id === bookId);

    if (!book) {
        throw new AppError({
            statusCode: HTTP.NOT_FOUND,
            message: MSG.BOOK_NOT_FOUND,
        });
    }

    const loan = loans.find(
        (l) => l.userId === userId && l.bookId === bookId && l.returnedAt === null
    );

    if (!loan) {
        throw new AppError({
            statusCode: HTTP.BAD_REQUEST,
            message: MSG.NOT_YOUR_LOAN,
        });
    }

    loan.returnedAt = new Date().toISOString();
    book.available = true;

    await write(DATA_NAMES.LOANS, loans);
    await write(DATA_NAMES.BOOKS, books);
};

module.exports = { borrow, returnBook, getActiveLoanForUser, getLoansForUser };
